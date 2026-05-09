# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `backend/` directory (or use the Maven wrapper from there):

```bash
# Build
.\mvnw.cmd clean package       # Windows
./mvnw clean package           # Linux/Mac

# Run
.\mvnw.cmd spring-boot:run

# Test (all)
.\mvnw.cmd test

# Test (single class)
.\mvnw.cmd test -Dtest=ClassName

# Clean
.\mvnw.cmd clean
```

## Architecture

Spring Boot 4.0 REST API (`com.overridetech.transfer`), Java 21, Maven build.

**Key dependencies:** Spring Web MVC, Spring Data JPA, Liquibase (migrations), Lombok.

**Structure:**
- `backend/src/main/java/com/overridetech/transfer/` — application source
- `backend/src/main/resources/application.properties` — Spring config (currently only app name)
- `backend/src/main/resources/db/changelog/` — Liquibase migration changelogs
- `frontend/` — empty, not yet implemented

**Entry point:** `TransferApplication.java` — standard `@SpringBootApplication`.

The project is a scaffold: JPA, Web, and Liquibase are wired in but no entities, controllers, or services exist yet. Database connection and Liquibase datasource must be configured in `application.properties` before running.
