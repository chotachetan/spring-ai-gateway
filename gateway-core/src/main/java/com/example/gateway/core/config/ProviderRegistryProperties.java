package com.example.gateway.core.config;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

/**
 * Root configuration object that mirrors the {@code gateway.providers}
 * property tree. Each provider entry declares the models and pricing
 * metadata that are loaded into the {@code ProviderRegistry} at runtime.
 */
@ConfigurationProperties("gateway.providers")
@Validated
public class ProviderRegistryProperties {

    /**
     * Collection of configured providers. Empty configurations are rejected to
     * avoid booting the gateway without any routable models.
     */
    @Valid
    @NotEmpty(message = "At least one provider must be configured")
    private List<ProviderConfig> providers = new ArrayList<>();

    public List<ProviderConfig> getProviders() {
        return providers;
    }

    public void setProviders(List<ProviderConfig> providers) {
        this.providers = providers;
    }

    /**
     * Description of a single upstream provider (e.g. OpenAI, Gemini).
     */
    public static class ProviderConfig {

        /** Unique provider identifier used for routing hints. */
        @NotBlank
        private String id;

        /** Human readable provider name for observability and docs. */
        @NotBlank
        private String displayName;

        /** Flag indicating whether the provider should receive traffic. */
        private boolean enabled = true;

        /**
         * Models exposed by the provider. Validation ensures that each provider has at
         * least one model so the registry does not contain empty providers.
         */
        @Valid
        @NotEmpty
        private List<ModelConfig> models = new ArrayList<>();

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getDisplayName() {
            return displayName;
        }

        public void setDisplayName(String displayName) {
            this.displayName = displayName;
        }

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public List<ModelConfig> getModels() {
            return models;
        }

        public void setModels(List<ModelConfig> models) {
            this.models = models;
        }
    }

    /**
     * Definition of an individual model exposed by a provider.
     */
    public static class ModelConfig {

        /** Model identifier used by the invocation pipeline. */
        @NotBlank
        private String id;

        /** High-level model type (chat, embedding, image, etc.). */
        @NotBlank
        private String type;

        /**
         * Declared capabilities so the router can match features without
         * relying on hard-coded model names.
         */
        @NotEmpty
        private List<String> capabilities = new ArrayList<>();

        /** Pricing metadata used by FinOps spend tracking. */
        @Valid
        @NotNull
        private Pricing pricing = new Pricing();

        /**
         * Ordered list of model ids that can act as fallbacks when this model
         * fails. The registry preserves order when resolving candidates.
         */
        private List<String> fallbackPriority = new ArrayList<>();

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public List<String> getCapabilities() {
            return capabilities;
        }

        public void setCapabilities(List<String> capabilities) {
            this.capabilities = capabilities;
        }

        public Pricing getPricing() {
            return pricing;
        }

        public void setPricing(Pricing pricing) {
            this.pricing = pricing;
        }

        public List<String> getFallbackPriority() {
            return fallbackPriority;
        }

        public void setFallbackPriority(List<String> fallbackPriority) {
            this.fallbackPriority = fallbackPriority;
        }
    }

    /**
     * Pricing definition for a model expressed in cost per token.
     */
    public static class Pricing {

        /** Cost per input token. */
        @NotNull
        private BigDecimal inputCost;

        /** Cost per output token. */
        @NotNull
        private BigDecimal outputCost;

        /** Currency code for the cost values (defaults to USD). */
        private String currency = "USD";

        public BigDecimal getInputCost() {
            return inputCost;
        }

        public void setInputCost(BigDecimal inputCost) {
            this.inputCost = inputCost;
        }

        public BigDecimal getOutputCost() {
            return outputCost;
        }

        public void setOutputCost(BigDecimal outputCost) {
            this.outputCost = outputCost;
        }

        public String getCurrency() {
            return currency;
        }

        public void setCurrency(String currency) {
            this.currency = currency;
        }
    }
}
