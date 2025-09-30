package com.example.gateway.core.pipeline;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.Duration;
import java.util.Collections;
import java.util.Map;
import java.util.Objects;

/**
 * Immutable response produced by the invocation pipeline. The response is
 * serialisable so it can be cached for FinOps optimisations.
 */
public final class InvocationResponse {

    private final Map<String, Object> payload;
    private final Map<String, Object> metadata;
    private final Duration latency;

    /**
     * Jackson creator used for cache (de-)serialisation.
     */
    @JsonCreator
    public InvocationResponse(
        @JsonProperty("payload") Map<String, Object> payload,
        @JsonProperty("metadata") Map<String, Object> metadata,
        @JsonProperty("latency") Duration latency) {
        this.payload = Map.copyOf(payload != null ? payload : Collections.emptyMap());
        this.metadata = Map.copyOf(metadata != null ? metadata : Collections.emptyMap());
        this.latency = latency != null ? latency : Duration.ZERO;
    }

    private InvocationResponse(Builder builder) {
        this.payload = Map.copyOf(builder.payload);
        this.metadata = Map.copyOf(builder.metadata);
        this.latency = builder.latency;
    }

    /** Raw response payload returned to clients. */
    public Map<String, Object> getPayload() {
        return payload;
    }

    /** Metadata such as provider, model, token usage, or cost. */
    public Map<String, Object> getMetadata() {
        return metadata;
    }

    /** Time spent processing the invocation end-to-end. */
    public Duration getLatency() {
        return latency;
    }

    /** Creates a builder for constructing responses programmatically. */
    public static Builder builder() {
        return new Builder();
    }

    /** Builder for {@link InvocationResponse}. */
    public static final class Builder {

        private Map<String, Object> payload = Collections.emptyMap();
        private Map<String, Object> metadata = Collections.emptyMap();
        private Duration latency = Duration.ZERO;

        /** Sets the response payload. */
        public Builder payload(Map<String, Object> payload) {
            this.payload = payload != null ? payload : Collections.emptyMap();
            return this;
        }

        /** Sets response metadata. */
        public Builder metadata(Map<String, Object> metadata) {
            this.metadata = metadata != null ? metadata : Collections.emptyMap();
            return this;
        }

        /** Sets the latency field. */
        public Builder latency(Duration latency) {
            this.latency = latency != null ? latency : Duration.ZERO;
            return this;
        }

        /** Constructs the immutable response instance. */
        public InvocationResponse build() {
            Objects.requireNonNull(payload, "payload must not be null");
            Objects.requireNonNull(metadata, "metadata must not be null");
            Objects.requireNonNull(latency, "latency must not be null");
            return new InvocationResponse(this);
        }
    }
}
