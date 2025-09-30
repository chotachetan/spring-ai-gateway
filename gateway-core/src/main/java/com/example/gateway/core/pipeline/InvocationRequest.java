package com.example.gateway.core.pipeline;

import java.util.Collections;
import java.util.Map;
import java.util.Objects;

/**
 * Immutable representation of an inbound invocation request passed through the
 * gateway pipeline. The request carries optional provider/model hints,
 * provider-agnostic payload data, and contextual attributes.
 */
public final class InvocationRequest {

    private final String providerHint;
    private final String modelHint;
    private final Map<String, Object> payload;
    private final Map<String, Object> attributes;

    private InvocationRequest(Builder builder) {
        this.providerHint = builder.providerHint;
        this.modelHint = builder.modelHint;
        this.payload = Map.copyOf(builder.payload);
        this.attributes = Map.copyOf(builder.attributes);
    }

    /** Optional provider hint supplied by clients. */
    public String getProviderHint() {
        return providerHint;
    }

    /** Optional model hint supplied by clients. */
    public String getModelHint() {
        return modelHint;
    }

    /** Provider-agnostic payload that is forwarded to the model client. */
    public Map<String, Object> getPayload() {
        return payload;
    }

    /** Additional attributes that travel with the request through the pipeline. */
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    /** Creates a new builder instance. */
    public static Builder builder() {
        return new Builder();
    }

    /** Builder used to construct immutable {@link InvocationRequest} instances. */
    public static final class Builder {

        private String providerHint;
        private String modelHint;
        private Map<String, Object> payload = Collections.emptyMap();
        private Map<String, Object> attributes = Collections.emptyMap();

        /** Sets the provider hint. */
        public Builder providerHint(String providerHint) {
            this.providerHint = providerHint;
            return this;
        }

        /** Sets the model hint. */
        public Builder modelHint(String modelHint) {
            this.modelHint = modelHint;
            return this;
        }

        /**
         * Supplies the request payload map.
         *
         * @param payload request payload
         * @return this builder
         */
        public Builder payload(Map<String, Object> payload) {
            this.payload = payload != null ? payload : Collections.emptyMap();
            return this;
        }

        /**
         * Supplies arbitrary attributes that will be copied into the invocation context.
         *
         * @param attributes attribute map
         * @return this builder
         */
        public Builder attributes(Map<String, Object> attributes) {
            this.attributes = attributes != null ? attributes : Collections.emptyMap();
            return this;
        }

        /**
         * Builds the immutable request instance.
         */
        public InvocationRequest build() {
            Objects.requireNonNull(payload, "payload must not be null");
            Objects.requireNonNull(attributes, "attributes must not be null");
            return new InvocationRequest(this);
        }
    }
}
