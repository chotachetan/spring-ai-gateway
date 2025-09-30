package com.example.gateway.clients.openai;

import com.example.gateway.clients.config.OpenAiClientProperties;
import com.example.gateway.core.client.ModelClient;
import com.example.gateway.core.model.ModelDescriptor;
import com.example.gateway.core.pipeline.InvocationContext;
import com.example.gateway.core.pipeline.InvocationResponse;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

/**
 * {@link ModelClient} implementation that invokes OpenAI chat completions via
 * the REST API. The client is intentionally lightweight and only models the
 * fields the gateway needs.
 */
@Component
public class OpenAiChatModelClient implements ModelClient {

    private final WebClient webClient;
    private final OpenAiClientProperties properties;

    public OpenAiChatModelClient(@Qualifier("openAiWebClient") WebClient webClient, OpenAiClientProperties properties) {
        this.webClient = webClient;
        this.properties = properties;
    }

    @Override
    public boolean supports(ModelDescriptor descriptor) {
        return descriptor != null
            && "openai".equalsIgnoreCase(descriptor.getProviderId())
            && "chat".equalsIgnoreCase(descriptor.getType());
    }

    @Override
    public Mono<InvocationResponse> invoke(InvocationContext context) {
        if (!StringUtils.hasText(properties.getApiKey())) {
            return Mono.error(new IllegalStateException("OpenAI API key is not configured"));
        }

        Object prompt = context.getRequest().getPayload().get("prompt");
        if (!(prompt instanceof String promptText) || promptText.isBlank()) {
            return Mono.error(new IllegalArgumentException("Chat payload requires a non-empty 'prompt' field"));
        }

        String model = context.getModel() != null ? context.getModel().getModelId() : properties.getDefaultModel();
        ChatCompletionRequest request = new ChatCompletionRequest(model, List.of(new Message("user", promptText)));
        Instant start = Instant.now();

        /*
         * The OpenAI REST API uses bearer authentication and model-specific
         * request payloads. The WebClient pipeline handles serialization and
         * marshals the minimal response shape defined below.
         */
        return webClient.post()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + properties.getApiKey())
            .contentType(MediaType.APPLICATION_JSON)
            .body(BodyInserters.fromValue(request))
            .retrieve()
            .bodyToMono(ChatCompletionResponse.class)
            .map(response -> buildResponse(context, response, Duration.between(start, Instant.now())));
    }

    private InvocationResponse buildResponse(InvocationContext context, ChatCompletionResponse response, Duration latency) {
        String content = response.firstMessageContent();
        Map<String, Object> metadata = Map.of(
            "model", context.getModel() != null ? context.getModel().getModelId() : properties.getDefaultModel(),
            "provider", context.getProvider() != null ? context.getProvider().getId() : "openai",
            "usage", response.usage() != null ? response.usage() : Map.of()
        );
        return new InvocationResponse(Map.of("content", content), metadata, latency);
    }

    private record ChatCompletionRequest(String model, List<Message> messages) { }

    private record Message(String role, String content) { }

    private record ChatCompletionResponse(List<Choice> choices, Map<String, Object> usage) {
        String firstMessageContent() {
            if (choices == null || choices.isEmpty()) {
                return "";
            }
            Message message = choices.get(0).message();
            return message != null ? message.content() : "";
        }
    }

    private record Choice(Message message, Integer index, Map<String, Object> logprobs, String finish_reason) { }
}
