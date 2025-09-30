package com.example.gateway.finops.usage;

import reactor.core.publisher.Mono;

/**
 * Records model usage data for spend tracking and analytics.
 */
public interface UsageRecorder {

    /**
     * Persists a usage record to the underlying store.
     */
    Mono<Void> record(UsageRecord record);
}
