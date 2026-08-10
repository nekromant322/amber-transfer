package com.overridetech.transfer.pricing;

import com.overridetech.transfer.service.DistanceService;
import com.overridetech.transfer.service.GeocodingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FallbackPriceCalculatorTest {

    // Real-ish coordinates: kaunas/vilnius sit on the Lithuania (Kybartai) side of the
    // Kaliningrad region, gdansk/elblag sit on the Poland (Grzechotki) side. chernyakhovsk is
    // inside the Kaliningrad region itself, closer to Kaliningrad than either border checkpoint.
    private static final double[] KALININGRAD_COORDS = {54.71, 20.51};
    private static final double[] KYBARTAI = {54.64, 22.76};
    private static final double[] GRZECHOTKI = {54.22, 19.99};
    private static final double[] KAUNAS = {54.90, 23.90};
    private static final double[] VILNIUS = {54.68, 25.28};
    private static final double[] GDANSK = {54.35, 18.65};
    private static final double[] ELBLAG = {54.16, 19.40};
    private static final double[] CHERNYAKHOVSK = {54.64, 21.81};
    private static final double[] KRAKOW = {50.05, 19.99};

    @Mock
    private PriceRegistry priceRegistry;
    @Mock
    private DistanceService distanceService;
    @Mock
    private GeocodingService geocodingService;

    private FallbackPriceCalculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new FallbackPriceCalculator(priceRegistry, distanceService, geocodingService);
        lenient().when(geocodingService.getCoordinates("kaliningrad")).thenReturn(KALININGRAD_COORDS);
        lenient().when(geocodingService.getCoordinates("kybartai")).thenReturn(KYBARTAI);
        lenient().when(geocodingService.getCoordinates("grzechotki")).thenReturn(GRZECHOTKI);
        lenient().when(geocodingService.getCoordinates("kaunas")).thenReturn(KAUNAS);
        lenient().when(geocodingService.getCoordinates("vilnius")).thenReturn(VILNIUS);
        lenient().when(geocodingService.getCoordinates("gdansk")).thenReturn(GDANSK);
        lenient().when(geocodingService.getCoordinates("elblag")).thenReturn(ELBLAG);
        lenient().when(geocodingService.getCoordinates("chernyakhovsk")).thenReturn(CHERNYAKHOVSK);
        lenient().when(geocodingService.getCoordinates("krakow")).thenReturn(KRAKOW);
    }

    @Test
    void returnsEmptyWhenNeitherCityIsKaliningrad() {
        assertThat(calculator.estimate("Berlin", "Warsaw", "eu")).isEmpty();
        verifyNoInteractions(priceRegistry, distanceService, geocodingService);
    }

    @Test
    void returnsEmptyWhenNoDestinationsAreKnown() {
        when(priceRegistry.destinationsFrom("kaliningrad")).thenReturn(Set.of());
        when(priceRegistry.getCustomsPrice("kaliningrad", "kybartai")).thenReturn(Optional.of(80));

        assertThat(calculator.estimate("Kaliningrad", "Kaunas", "other")).isEmpty();
    }

    @Test
    void returnsEmptyWhenCustomsBasePriceIsMissing() {
        when(priceRegistry.getCustomsPrice("kaliningrad", "kybartai")).thenReturn(Optional.empty());

        assertThat(calculator.estimate("Kaliningrad", "Kaunas", "other")).isEmpty();
    }

    @Test
    void extrapolatesFromNearestKnownCityOnTheSameCorridor() {
        when(priceRegistry.getCustomsPrice("kaliningrad", "kybartai")).thenReturn(Optional.of(80));
        when(priceRegistry.destinationsFrom("kaliningrad")).thenReturn(Set.of("vilnius"));
        when(priceRegistry.getPrice("kaliningrad", "vilnius")).thenReturn(Optional.of(180));
        when(distanceService.calculateDistance("kybartai", "vilnius")).thenReturn(100.0);
        when(distanceService.calculateDistance("kybartai", "kaunas")).thenReturn(60.0);

        // rate = (180 - 80) / 100 = 1.0 per km; price = 80 + 1.0 * 60 = 140
        assertThat(calculator.estimate("Kaliningrad", "Kaunas", "other")).contains(140);
    }

    @Test
    void ignoresDomesticCitiesEvenWhenTheyAreStraightLineNearestToTheTarget() {
        // chernyakhovsk is inside the Kaliningrad region (never crossed a border), and happens to
        // sit in a straight line closer to a far-away target like Krakow than genuine EU cities do.
        // It must be excluded from the reference-rate pool - otherwise its price (which has no
        // customs cost baked in) produces a nonsensical/negative per-km rate.
        when(priceRegistry.getCustomsPrice("kaliningrad", "kybartai")).thenReturn(Optional.of(130));
        when(priceRegistry.destinationsFrom("kaliningrad")).thenReturn(Set.of("chernyakhovsk", "kaunas"));
        when(priceRegistry.getPrice("kaliningrad", "kaunas")).thenReturn(Optional.of(200));
        when(distanceService.calculateDistance("kybartai", "kaunas")).thenReturn(70.0);
        when(distanceService.calculateDistance("kybartai", "krakow")).thenReturn(680.0);

        // rate = (200 - 130) / 70 = 1.0 per km; price = 130 + 1.0 * 680 = 810
        assertThat(calculator.estimate("Kaliningrad", "Krakow", "other")).contains(810);
        verify(priceRegistry, never()).getPrice("kaliningrad", "chernyakhovsk");
    }

    @Test
    void resolvesTargetRegardlessOfArgumentOrder() {
        when(priceRegistry.getCustomsPrice("kaliningrad", "kybartai")).thenReturn(Optional.of(80));
        when(priceRegistry.destinationsFrom("kaliningrad")).thenReturn(Set.of("vilnius"));
        when(priceRegistry.getPrice("kaliningrad", "vilnius")).thenReturn(Optional.of(180));
        when(distanceService.calculateDistance("kybartai", "vilnius")).thenReturn(100.0);
        when(distanceService.calculateDistance("kybartai", "kaunas")).thenReturn(60.0);

        assertThat(calculator.estimate("Kaunas", "Kaliningrad", "other")).contains(140);
    }

    @Test
    void euPassportPicksTheCheaperOfTheTwoEligibleCorridors() {
        // Target sits right next to the Poland border - Grzechotki should win.
        when(priceRegistry.getCustomsPrice("kaliningrad", "kybartai")).thenReturn(Optional.of(80));
        when(priceRegistry.getCustomsPrice("kaliningrad", "grzechotki")).thenReturn(Optional.of(90));
        when(priceRegistry.destinationsFrom("kaliningrad")).thenReturn(Set.of("vilnius", "gdansk"));
        when(priceRegistry.getPrice("kaliningrad", "vilnius")).thenReturn(Optional.of(180));
        when(priceRegistry.getPrice("kaliningrad", "gdansk")).thenReturn(Optional.of(200));

        when(distanceService.calculateDistance("kybartai", "vilnius")).thenReturn(100.0);
        when(distanceService.calculateDistance("kybartai", "elblag")).thenReturn(250.0);
        when(distanceService.calculateDistance("grzechotki", "gdansk")).thenReturn(90.0);
        when(distanceService.calculateDistance("grzechotki", "elblag")).thenReturn(40.0);

        // via Kybartai:   80 + ((180-80)/100) * 250 = 330
        // via Grzechotki: 90 + ((200-90)/90) * 40  ~= 138.9 -> rounds up to 140
        assertThat(calculator.estimate("Kaliningrad", "Elblag", "eu")).contains(140);
    }

    @Test
    void nonEuPassportIsForcedThroughLithuaniaEvenWhenGrzechotkiWouldBeCheaper() {
        when(priceRegistry.getCustomsPrice("kaliningrad", "kybartai")).thenReturn(Optional.of(80));
        when(priceRegistry.destinationsFrom("kaliningrad")).thenReturn(Set.of("vilnius", "gdansk"));
        when(priceRegistry.getPrice("kaliningrad", "vilnius")).thenReturn(Optional.of(180));
        when(distanceService.calculateDistance("kybartai", "vilnius")).thenReturn(100.0);
        when(distanceService.calculateDistance("kybartai", "elblag")).thenReturn(250.0);

        // Only the Kybartai corridor may be used: 80 + ((180-80)/100) * 250 = 330
        assertThat(calculator.estimate("Kaliningrad", "Elblag", "other")).contains(330);
        verify(priceRegistry, never()).getCustomsPrice("kaliningrad", "grzechotki");
    }

    @Test
    void cachesRepeatedEstimatesForTheSameTargetAndPassport() {
        when(priceRegistry.getCustomsPrice("kaliningrad", "kybartai")).thenReturn(Optional.of(80));
        when(priceRegistry.destinationsFrom("kaliningrad")).thenReturn(Set.of("vilnius"));
        when(priceRegistry.getPrice("kaliningrad", "vilnius")).thenReturn(Optional.of(180));
        when(distanceService.calculateDistance("kybartai", "vilnius")).thenReturn(100.0);
        when(distanceService.calculateDistance("kybartai", "kaunas")).thenReturn(60.0);

        calculator.estimate("Kaliningrad", "Kaunas", "other");
        calculator.estimate("Kaliningrad", "Kaunas", "other");

        verify(priceRegistry, times(1)).getCustomsPrice("kaliningrad", "kybartai");
        verify(distanceService, times(1)).calculateDistance("kybartai", "kaunas");
    }

    @Test
    void clearCacheForcesRecomputation() {
        when(priceRegistry.getCustomsPrice("kaliningrad", "kybartai")).thenReturn(Optional.of(80));
        when(priceRegistry.destinationsFrom("kaliningrad")).thenReturn(Set.of("vilnius"));
        when(priceRegistry.getPrice("kaliningrad", "vilnius")).thenReturn(Optional.of(180));
        when(distanceService.calculateDistance("kybartai", "vilnius")).thenReturn(100.0);
        when(distanceService.calculateDistance("kybartai", "kaunas")).thenReturn(60.0);

        calculator.estimate("Kaliningrad", "Kaunas", "other");
        calculator.clearCache();
        calculator.estimate("Kaliningrad", "Kaunas", "other");

        verify(priceRegistry, times(2)).getCustomsPrice("kaliningrad", "kybartai");
    }

    @Test
    void skipsCorridorWhenTargetCityCannotBeGeocoded() {
        when(priceRegistry.getCustomsPrice("kaliningrad", "kybartai")).thenReturn(Optional.of(80));
        when(geocodingService.getCoordinates("atlantis")).thenThrow(new RuntimeException("not found"));

        assertThat(calculator.estimate("Kaliningrad", "Atlantis", "other")).isEmpty();
    }
}
