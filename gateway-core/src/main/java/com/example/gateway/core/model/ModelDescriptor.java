package com.example.gateway.core.model;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * Immutable description of a model that can be invoked through the gateway.
 * Instances are derived from {@code ProviderRegistryProperties} and shared
 * between filters to describe cost, capabilities, and fallback rules.
 */
public final class ModelDescriptor {

    private final String providerId;
    private final String modelId;
    private final String type;
    private final List<String> capabilities;
    private final BigDecimal inputCost;
    private final BigDecimal outputCost;
    private final String currency;
    private final List<String> fallbackPriority;

    private ModelDescriptor(Builder builder) {
        this.providerId = builder.providerId;
        this.modelId = builder.modelId;
        this.type = builder.type;
        this.capabilities = List.copyOf(builder.capabilities);
        this.inputCost = builder.inputCost;
        this.outputCost = builder.outputCost;
        this.currency = builder.currency;
        this.fallbackPriority = List.copyOf(builder.fallbackPriority);
    }

    /** Identifier of the provider that owns the model. */
    public String getProviderId() {
        return providerId;
    }

    /** Identifier exposed to clients for routing purposes. */
    public String getModelId() {
        return modelId;
    }

    /** Model type describing the shape of the invocation (chat, embeddings, etc.). */
    public String getType() {
        return type;
    }

    /** Capabilities advertised by the model (e.g. chat, reasoning). */
    public List<String> getCapabilities() {
        return capabilities;
    }

    /** Cost per input token. */
    public BigDecimal getInputCost() {
        return inputCost;
    }

    /** Cost per output token. */
    public BigDecimal getOutputCost() {
        return outputCost;
    }

    /** Currency code for the cost values. */
    public String getCurrency() {
        return currency;
    }

    /** Ordered fallback model identifiers. */
    public List<String> getFallbackPriority() {
        return fallbackPriority;
    }

    /** Creates a new builder for {@link ModelDescriptor}. */
    public static Builder builder() {
        return new Builder();
    }

    /** Builder used to create immutable {@link ModelDescriptor} instances. */
    public static final class Builder {

        private String providerId;
        private String modelId;
        private String type;
        private List<String> capabilities = Collections.emptyList();
        private BigDecimal inputCost = BigDecimal.ZERO;
        private BigDecimal outputCost = BigDecimal.ZERO;
        private String currency = "USD";
        private List<String> fallbackPriority = Collections.emptyList();

        /**
         * Sets the provider identifier.
         *
         * @param providerId provider identifier
         * @return this builder
         */
        public Builder providerId(String providerId) {
            this.providerId = providerId;
            return this;
        }

        /**
         * Sets the model identifier.
         *
         * @param modelId model identifier
         * @return this builder
         */
        public Builder modelId(String modelId) {
            this.modelId = modelId;
            return this;
        }

        /**
         * Declares the model type.
         *
         * @param type model type
         * @return this builder
         */
        public Builder type(String type) {
            this.type = type;
            return this;
        }

        /**
         * Populates the capabilities collection.
         *
         * @param capabilities list of capabilities
         * @return this builder
         */
        public Builder capabilities(List<String> capabilities) {
            this.capabilities = capabilities != null ? capabilities : Collections.emptyList();
            return this;
        }

        /**
         * Sets the input token cost.
         *
         * @param inputCost cost per input token
         * @return this builder
         */
        public Builder inputCost(BigDecimal inputCost) {
            this.inputCost = inputCost;
            return this;
        }

        /**
         * Sets the output token cost.
         *
         * @param outputCost cost per output token
         * @return this builder
         */
        public Builder outputCost(BigDecimal outputCost) {
            this.outputCost = outputCost;
            return this;
        }

        /**
         * Sets the currency code.
         *
         * @param currency cost currency
         * @return this builder
         */
        public Builder currency(String currency) {
            this.currency = currency;
            return this;
        }

        /**
         * Defines the fallback priority list.
         *
         * @param fallbackPriority ordered fallback model ids
         * @return this builder
         */
        public Builder fallbackPriority(List<String> fallbackPriority) {
            this.fallbackPriority = fallbackPriority != null ? fallbackPriority : Collections.emptyList();
            return this;
        }

        /**
         * Creates the immutable descriptor after validating mandatory fields.
         *
         * @return immutable descriptor
         */
        public ModelDescriptor build() {
            Objects.requireNonNull(providerId, "providerId must not be null");
            Objects.requireNonNull(modelId, "modelId must not be null");
            Objects.requireNonNull(type, "type must not be null");
            Objects.requireNonNull(inputCost, "inputCost must not be null");
            Objects.requireNonNull(outputCost, "outputCost must not be null");
            Objects.requireNonNull(currency, "currency must not be null");
            return new ModelDescriptor(this);
        }
    }
}
