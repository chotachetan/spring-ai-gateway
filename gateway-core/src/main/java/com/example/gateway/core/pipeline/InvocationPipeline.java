package com.example.gateway.core.pipeline;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import reactor.core.publisher.Mono;

/**
 * Orchestrates invocation filters and the terminal handler. Filters are
 * executed in the order provided by Spring, typically ordered using
 * {@code Ordered} or {@code @Order} annotations.
 */
public class InvocationPipeline {

    private final List<InvocationFilter> filters;
    private final ReactiveInvocationHandler handler;

    /**
     * Creates a new pipeline instance.
     *
     * @param filters ordered list of filters
     * @param handler terminal handler
     */
    public InvocationPipeline(List<InvocationFilter> filters, ReactiveInvocationHandler handler) {
        this.filters = filters != null ? List.copyOf(filters) : Collections.emptyList();
        this.handler = Objects.requireNonNull(handler, "handler must not be null");
    }

    /**
     * Executes the pipeline for the supplied request.
     */
    public Mono<InvocationResponse> invoke(InvocationRequest request) {
        InvocationContext context = new InvocationContext(request);
        return new DefaultChain(0).next(context);
    }

    /** Default chain implementation that walks the filter list. */
    private class DefaultChain implements InvocationFilter.Chain {

        private final int index;

        private DefaultChain(int index) {
            this.index = index;
        }

        @Override
        public Mono<InvocationResponse> next(InvocationContext context) {
            if (index < filters.size()) {
                InvocationFilter filter = filters.get(index);
                return filter.filter(context, new DefaultChain(index + 1));
            }
            return handler.invoke(context);
        }
    }

    /**
     * Creates a new pipeline instance with a filter prepended to the current
     * list. Primarily used in tests.
     */
    public InvocationPipeline prependFilter(InvocationFilter filter) {
        Objects.requireNonNull(filter, "filter");
        List<InvocationFilter> newFilters = new ArrayList<>();
        newFilters.add(filter);
        newFilters.addAll(this.filters);
        return new InvocationPipeline(newFilters, this.handler);
    }
}
