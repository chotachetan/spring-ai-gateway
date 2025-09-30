package com.example.gateway.clients.gemini;

import com.example.gateway.clients.config.GeminiClientProperties;
import com.example.gateway.core.client.ModelClient;
import com.example.gateway.core.model.ModelDescriptor;
import com.example.gateway.core.pipeline.InvocationContext;
import com.example.gateway.core.pipeline.InvocationResponse;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriBuilder;
import reactor.core.publisher.Mono;

@Component
public class GeminiChatModelClient implements ModelClient {

    private final WebClient webClient;
    private final GeminiClientProperties properties;

    public GeminiChatModelClient(@Qualifier("geminiWebClient") WebClient webClient, GeminiClientProperties properties) {
        this.webClient = webClient;
        this.properties = properties;
    }

    @Override
    public boolean supports(ModelDescriptor descriptor) {
        return descriptor != null
            && "gemini".equalsIgnoreCase(descriptor.getProviderId())
            && "chat".equalsIgnoreCase(descriptor.getType());
    }

    @Override
    public Mono<InvocationResponse> invoke(InvocationContext context) {
        if (!StringUtils.hasText(properties.getApiKey())) {
            return Mono.error(new IllegalStateException("Gemini API key is not configured"));
        }

        Object prompt = context.getRequest().getPayload().get("prompt");
        if (!(prompt instanceof String promptText) || promptText.isBlank()) {
            return Mono.error(new IllegalArgumentException("Chat payload requires a non-empty 'prompt' field"));
        }

        String modelId = context.getModel() != null ? context.getModel().getModelId() : properties.getDefaultModel();
        GenerateContentRequest request = new GenerateContentRequest(List.of(new Content(List.of(new Part(promptText)))));
        Instant start = Instant.now();

        return webClient.post()
            .uri(uriBuilder -> buildUri(uriBuilder, modelId))
            .contentType(MediaType.APPLICATION_JSON)
            .body(BodyInserters.fromValue(request))
            .retrieve()
            .bodyToMono(GenerateContentResponse.class)
            .map(response -> buildResponse(context, response, Duration.between(start, Instant.now()), modelId));
    }

    private InvocationResponse buildResponse(InvocationContext context, GenerateContentResponse response, Duration latency, String modelId) {
        String content = response.firstText();
        Map<String, Object> usageMetadata = response.usageMetadata() != null ? response.usageMetadata().asMap() : Map.of();
        Map<String, Object> metadata = Map.of(
            "model", modelId,
            "provider", context.getProvider() != null ? context.getProvider().getId() : "gemini",
            "usage", usageMetadata
        );
        return new InvocationResponse(Map.of("content", content), metadata, latency);
    }

    private java.net.URI buildUri(UriBuilder builder, String modelId) {
        return builder
            .pathSegment(modelId)
            .path(":generateContent")
            .queryParam("key", properties.getApiKey())
            .build();
    }

    private record GenerateContentRequest(List<Content> contents) { }

    private record Content(List<Part> parts) { }

    private record Part(String text) { }

    private record GenerateContentResponse(List<Candidate> candidates, UsageMetadata usageMetadata) {

        String firstText() {
            if (candidates == null || candidates.isEmpty()) {
                return "";
            }
            Content content = candidates.get(0).content();
            if (content == null || content.parts() == null || content.parts().isEmpty()) {
                return "";
            }
            Part part = content.parts().get(0);
            return part != null && part.text() != null ? part.text() : "";
        }
    }

    private record Candidate(Content content, String finishReason) { }

    private record UsageMetadata(Integer promptTokenCount, Integer candidatesTokenCount, Integer totalTokenCount) {
        Map<String, Object> asMap() {
            return Map.of(
                "promptTokens", promptTokenCount != null ? promptTokenCount : 0,
                "candidatesTokens", candidatesTokenCount != null ? candidatesTokenCount : 0,
                "totalTokens", totalTokenCount != null ? totalTokenCount : 0
            );
        }
    }
}
