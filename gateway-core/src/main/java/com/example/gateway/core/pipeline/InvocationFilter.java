package com.example.gateway.core.pipeline;

import reactor.core.publisher.Mono;

/**
 * Contract for reactive invocation filters. Filters can inspect or mutate the
 * {@link InvocationContext} before delegating to the next element in the chain.
 */
public interface InvocationFilter {

    /**
     * Applies the filter logic.
     *
     * @param context invocation context shared across filters
     * @param chain continuation used to invoke the next filter or handler
     * @return reactive response publisher
     */
    Mono<InvocationResponse> filter(InvocationContext context, Chain chain);

    /**
     * Continuation that advances the filter chain.
     */
    interface Chain {
        /**
         * Proceeds to the next filter or terminal handler.
         *
         * @param context invocation context
         * @return response publisher
         */
        Mono<InvocationResponse> next(InvocationContext context);
    }
}
