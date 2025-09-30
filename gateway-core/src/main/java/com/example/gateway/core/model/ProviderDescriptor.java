package com.example.gateway.core.model;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * Immutable representation of a provider in the registry. Providers aggregate
 * their exposed models and carry naming metadata that is used for user-facing
 * responses and observability tags.
 */
public final class ProviderDescriptor {

    private final String id;
    private final String displayName;
    private final boolean enabled;
    private final List<ModelDescriptor> models;

    private ProviderDescriptor(Builder builder) {
        this.id = builder.id;
        this.displayName = builder.displayName;
        this.enabled = builder.enabled;
        this.models = List.copyOf(builder.models);
    }

    /** Unique provider identifier. */
    public String getId() {
        return id;
    }

    /** Human-readable provider name. */
    public String getDisplayName() {
        return displayName;
    }

    /** Flag indicating whether the provider is enabled. */
    public boolean isEnabled() {
        return enabled;
    }

    /** Immutable list of models owned by the provider. */
    public List<ModelDescriptor> getModels() {
        return models;
    }

    /** Creates a new builder instance. */
    public static Builder builder() {
        return new Builder();
    }

    /** Builder for {@link ProviderDescriptor}. */
    public static final class Builder {

        private String id;
        private String displayName;
        private boolean enabled = true;
        private List<ModelDescriptor> models = Collections.emptyList();

        /** Sets the provider id. */
        public Builder id(String id) {
            this.id = id;
            return this;
        }

        /** Sets the display name. */
        public Builder displayName(String displayName) {
            this.displayName = displayName;
            return this;
        }

        /** Configures the enabled flag. */
        public Builder enabled(boolean enabled) {
            this.enabled = enabled;
            return this;
        }

        /** Supplies the list of models. */
        public Builder models(List<ModelDescriptor> models) {
            this.models = models != null ? models : Collections.emptyList();
            return this;
        }

        /** Builds the immutable descriptor, validating required fields. */
        public ProviderDescriptor build() {
            Objects.requireNonNull(id, "id must not be null");
            Objects.requireNonNull(displayName, "displayName must not be null");
            return new ProviderDescriptor(this);
        }
    }
}
