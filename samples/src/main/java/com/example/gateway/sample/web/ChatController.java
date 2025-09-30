package com.example.gateway.sample.web;

import com.example.gateway.core.pipeline.InvocationPipeline;
import com.example.gateway.core.pipeline.InvocationRequest;
import com.example.gateway.core.pipeline.InvocationResponse;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

/**
 * Reactive REST controller exposing a simple chat endpoint to demonstrate the
 * gateway pipeline.
 */
@RestController
@RequestMapping(path = "/v1", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class ChatController {

    private final InvocationPipeline invocationPipeline;

    public ChatController(InvocationPipeline invocationPipeline) {
        this.invocationPipeline = invocationPipeline;
    }

    /**
     * Invokes the gateway pipeline for the submitted prompt.
     */
    @PostMapping(path = "/chat", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ChatResponse> chat(@Valid @RequestBody ChatRequest request) {
        InvocationRequest invocationRequest = InvocationRequest.builder()
            .providerHint(request.getProvider())
            .modelHint(request.getModel())
            .payload(Map.of("prompt", request.getPrompt()))
            .build();

        return invocationPipeline.invoke(invocationRequest)
            .map(this::toResponse);
    }

    private ChatResponse toResponse(InvocationResponse response) {
        return new ChatResponse(response.getPayload(), response.getMetadata(), response.getLatency());
    }
}
