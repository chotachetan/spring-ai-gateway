## Spring Cloud AI API Gateway

````markdown
# AI API Gateway (Spring Cloud Reactive)

A unified, reactive AI API Gateway built on **Spring Boot**, **Spring Cloud Gateway**, and **WebFlux**.  
Supports multiple AI providers with reliability, caching, spend tracking, and observability built in.

---

## Prerequisites

- **Install Java & Maven**  
  Ensure **Java 21+** and **Maven 3.9+** are installed.

- **Set API Credentials**  
  API keys should be exported as environment variables before startup:
  ```bash
  export OPENAI_API_KEY=...       # Optional
  export GEMINI_API_KEY=...       # Required if using Gemini
````

* **Start Backing Services**
  Backing services defined in `samples/src/main/resources/application.yml` must be running:

  * **Redis**: `localhost:6379`
  * **Postgres**: `jdbc:postgresql://localhost:5432/ai_gateway` (user/password: `ai_gateway`)

  Teams may run their own instances or update the YAML configuration to match their environment.

---

## Build & Run

* **Compile All Modules**
  Compile the project to pick up generated sources and tests:

  ```bash
  mvn -pl samples -am compile
  ```

* **Run the Sample Application**
  Start the Spring Boot application, which exposes the `/v1/chat` endpoint:

  ```bash
  mvn -pl samples spring-boot:run
  ```

---

## Usage

Once the application is running, the unified chat endpoint can be called as follows:

```bash
curl -X POST http://localhost:8080/v1/chat \
  -H 'Content-Type: application/json' \
  -d '{"provider":"gemini","model":"gemini-1.5-flash","prompt":"Hello!"}'
```

If the `provider` field is omitted, the routing filter automatically selects the first enabled model that matches.

---

## Architecture Diagram

![alt text](architecture-diagram.png)

---

## Optional Configurations

1. **Override Datastore Credentials**
   Hosts or credentials can be changed using `SPRING_*` environment variables or by editing
   `samples/src/main/resources/application.yml`.

2. **Skip Redis/Postgres**
   Caching and spend tracking filters can be temporarily disabled for smoke testing by commenting out the relevant beans in `FinOpsConfiguration`.

---

## Sequence Diagram

![alt text](sequence-diagram.png)


