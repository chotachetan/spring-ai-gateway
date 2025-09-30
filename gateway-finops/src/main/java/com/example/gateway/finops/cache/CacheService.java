package com.example.gateway.finops.cache;

import com.example.gateway.core.pipeline.InvocationResponse;
import reactor.core.publisher.Mono;

/**
 * Abstraction for caching invocation responses. Different backing stores (e.g.
 * Redis, in-memory) can implement this interface.
 */
public interface CacheService {

    /**
     * Retrieves a cached response if present.
     */
    Mono<InvocationResponse> get(String key);

    /**
     * Stores a response using the supplied key.
     */
    Mono<Void> put(String key, InvocationResponse response);
}
