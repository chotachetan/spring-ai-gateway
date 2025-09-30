package com.example.gateway.clients.service;

import com.example.gateway.core.client.ModelClient;
import com.example.gateway.core.model.ModelDescriptor;
import java.util.List;
import java.util.Objects;
import org.springframework.stereotype.Component;

/**
 * Registry that locates the correct {@link ModelClient} implementation for a
 * resolved {@link ModelDescriptor}. The registry relies on Spring collection
 * injection to gather all client beans.
 */
@Component
public class ModelClientRegistry {

    private final List<ModelClient> delegates;

    public ModelClientRegistry(List<ModelClient> delegates) {
        this.delegates = List.copyOf(Objects.requireNonNullElseGet(delegates, List::of));
    }

    /**
     * Returns the first client that reports support for the descriptor.
     *
     * @param descriptor resolved model descriptor
     * @return supporting client
     * @throws IllegalStateException when no supporting client exists
     */
    public ModelClient resolve(ModelDescriptor descriptor) {
        return delegates.stream()
            .filter(delegate -> delegate.supports(descriptor))
            .findFirst()
            .orElseThrow(() -> new IllegalStateException("No client registered for model " + descriptor.getModelId()));
    }
}
