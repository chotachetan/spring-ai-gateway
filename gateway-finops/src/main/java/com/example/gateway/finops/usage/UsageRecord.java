package com.example.gateway.finops.usage;

import java.time.Instant;

/**
 * Data object capturing a single invocation's cost and token usage.
 */
public class UsageRecord {

    private String providerId;
    private String modelId;
    private long inputTokens;
    private long outputTokens;
    private double cost;
    private Instant timestamp;

    public UsageRecord() {
    }

    public UsageRecord(String providerId, String modelId, long inputTokens, long outputTokens, double cost, Instant timestamp) {
        this.providerId = providerId;
        this.modelId = modelId;
        this.inputTokens = inputTokens;
        this.outputTokens = outputTokens;
        this.cost = cost;
        this.timestamp = timestamp;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public String getModelId() {
        return modelId;
    }

    public void setModelId(String modelId) {
        this.modelId = modelId;
    }

    public long getInputTokens() {
        return inputTokens;
    }

    public void setInputTokens(long inputTokens) {
        this.inputTokens = inputTokens;
    }

    public long getOutputTokens() {
        return outputTokens;
    }

    public void setOutputTokens(long outputTokens) {
        this.outputTokens = outputTokens;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }
}
