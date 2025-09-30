package com.example.gateway.sample.web;

import java.time.Duration;
import java.util.Map;

/**
 * Response payload for the sample chat endpoint.
 */
public class ChatResponse {

    private Map<String, Object> payload;
    private Map<String, Object> metadata;
    private Duration latency;

    public ChatResponse() {
    }

    public ChatResponse(Map<String, Object> payload, Map<String, Object> metadata, Duration latency) {
        this.payload = payload;
        this.metadata = metadata;
        this.latency = latency;
    }

    public Map<String, Object> getPayload() {
        return payload;
    }

    public void setPayload(Map<String, Object> payload) {
        this.payload = payload;
    }

    public Map<String, Object> getMetadata() {
        return metadata;
    }

    public void setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
    }

    public Duration getLatency() {
        return latency;
    }

    public void setLatency(Duration latency) {
        this.latency = latency;
    }
}
