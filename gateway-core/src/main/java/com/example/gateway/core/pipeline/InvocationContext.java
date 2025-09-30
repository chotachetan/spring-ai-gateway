package com.example.gateway.core.pipeline;

import com.example.gateway.core.model.ModelDescriptor;
import com.example.gateway.core.model.ProviderDescriptor;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * Mutable context shared between invocation filters. The context allows
 * filters to attach additional metadata without mutating the original
 * {@link InvocationRequest}.
 */
public final class InvocationContext {

    private final InvocationRequest request;
    private ProviderDescriptor provider;
    private ModelDescriptor model;
    private final Map<String, Object> attributes = new HashMap<>();

    /** Creates a new context derived from the incoming request. */
    public InvocationContext(InvocationRequest request) {
        this.request = Objects.requireNonNull(request, "request must not be null");
        this.attributes.putAll(request.getAttributes());
    }

    /** Returns the original request. */
    public InvocationRequest getRequest() {
        return request;
    }

    /** Returns the resolved provider descriptor. */
    public ProviderDescriptor getProvider() {
        return provider;
    }

    /** Updates the resolved provider descriptor. */
    public void setProvider(ProviderDescriptor provider) {
        this.provider = provider;
    }

    /** Returns the resolved model descriptor. */
    public ModelDescriptor getModel() {
        return model;
    }

    /** Updates the resolved model descriptor. */
    public void setModel(ModelDescriptor model) {
        this.model = model;
    }

    /** Mutable attribute map available to downstream filters. */
    public Map<String, Object> getAttributes() {
        return attributes;
    }
}
