package com.example.gateway.core.pipeline;

import reactor.core.publisher.Mono;

/**
 * Terminal component of the invocation pipeline. Implementations execute the
 * provider-specific logic once all filters have completed.
 */
@FunctionalInterface
public interface ReactiveInvocationHandler {

    /**
     * Executes the provider call using the fully prepared context.
     *
     * @param context invocation context
     * @return response publisher
     */
    Mono<InvocationResponse> invoke(InvocationContext context);
}
