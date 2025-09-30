package com.example.gateway.clients.service;

import com.example.gateway.core.client.ModelClient;
import com.example.gateway.core.pipeline.InvocationContext;
import com.example.gateway.core.pipeline.InvocationResponse;
import com.example.gateway.core.pipeline.ReactiveInvocationHandler;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

/**
 * Terminal handler that delegates the invocation to the resolved
 * {@link ModelClient} implementation.
 */
@Component
public class ClientInvocationHandler implements ReactiveInvocationHandler {

    private final ModelClientRegistry registry;

    public ClientInvocationHandler(ModelClientRegistry registry) {
        this.registry = registry;
    }

    @Override
    public Mono<InvocationResponse> invoke(InvocationContext context) {
        ModelClient client = registry.resolve(context.getModel());
        return client.invoke(context);
    }
}
