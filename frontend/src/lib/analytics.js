export const YANDEX_METRIKA_ID = 111473963

export function trackGoal(name) {
  if (typeof window === 'undefined' || !window.ym || !YANDEX_METRIKA_ID) return
  window.ym(YANDEX_METRIKA_ID, 'reachGoal', name)
}
