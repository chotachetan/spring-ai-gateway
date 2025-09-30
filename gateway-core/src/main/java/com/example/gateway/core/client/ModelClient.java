package com.example.gateway.core.client;

import com.example.gateway.core.model.ModelDescriptor;
import com.example.gateway.core.pipeline.InvocationContext;
import com.example.gateway.core.pipeline.InvocationResponse;
import reactor.core.publisher.Mono;

/**
 * Contract for provider-specific client implementations capable of invoking a
 * model based on the resolved {@link ModelDescriptor}.
 */
public interface ModelClient {

    /**
     * Indicates whether the client can handle the supplied model descriptor.
     *
     * @param descriptor model descriptor
     * @return {@code true} if this client can handle the descriptor
     */
    boolean supports(ModelDescriptor descriptor);

    /**
     * Performs the model invocation and returns a reactive response.
     *
     * @param context invocation context with model and provider information
     * @return response publisher
     */
    Mono<InvocationResponse> invoke(InvocationContext context);
}
