package com.example.gateway.core.registry;

import com.example.gateway.core.config.ProviderRegistryProperties;
import com.example.gateway.core.model.ModelDescriptor;
import com.example.gateway.core.model.ProviderDescriptor;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

/**
 * Thread-safe in-memory registry that exposes provider and model metadata to
 * the rest of the gateway. The registry is loaded from
 * {@link ProviderRegistryProperties} at construction and can be refreshed when
 * configuration changes are detected.
 */
@Component
public class ProviderRegistry {

    private final Map<String, ProviderDescriptor> providers = new ConcurrentHashMap<>();

    /**
     * Creates a new registry instance backed by the supplied configuration
     * properties.
     *
     * @param properties provider configuration properties
     */
    public ProviderRegistry(ProviderRegistryProperties properties) {
        Objects.requireNonNull(properties, "properties");
        refresh(properties);
    }

    /**
     * Returns an immutable snapshot of all configured providers.
     */
    public List<ProviderDescriptor> listProviders() {
        return List.copyOf(providers.values());
    }

    /**
     * Resolves the provider descriptor by id if present.
     */
    public Optional<ProviderDescriptor> findProvider(String providerId) {
        return Optional.ofNullable(providers.get(providerId));
    }

    /**
     * Finds a model descriptor for the given provider/model combination.
     */
    public Optional<ModelDescriptor> findModel(String providerId, String modelId) {
        return findProvider(providerId)
            .flatMap(provider -> provider.getModels().stream()
                .filter(model -> model.getModelId().equals(modelId))
                .findFirst());
    }

    /**
     * Returns all models that advertise a given capability.
     */
    public List<ModelDescriptor> findModelsByCapability(String capability) {
        if (capability == null) {
            return Collections.emptyList();
        }
        return providers.values().stream()
            .flatMap(provider -> provider.getModels().stream())
            .filter(model -> model.getCapabilities().contains(capability))
            .collect(Collectors.toUnmodifiableList());
    }

    /**
     * Resolves fallback candidates for a model respecting configured priority.
     */
    public List<ModelDescriptor> findFallbackCandidates(ModelDescriptor model) {
        if (model == null) {
            return Collections.emptyList();
        }
        List<String> fallbackPriority = model.getFallbackPriority();
        if (fallbackPriority.isEmpty()) {
            return Collections.emptyList();
        }
        /*
         * The loop preserves the order in the fallback list by resolving each
         * model id independently. This prevents random ordering that would be
         * introduced by using Set-based lookups.
         */
        List<ModelDescriptor> descriptors = new ArrayList<>();
        for (String candidateId : fallbackPriority) {
            providers.values().stream()
                .map(ProviderDescriptor::getModels)
                .flatMap(Collection::stream)
                .filter(candidate -> candidate.getModelId().equals(candidateId))
                .findFirst()
                .ifPresent(descriptors::add);
        }
        return List.copyOf(descriptors);
    }

    /**
     * Rebuilds the internal provider cache from the supplied configuration.
     * This method can be reused by configuration change listeners to refresh
     * the registry without recreating the bean.
     */
    public final void refresh(ProviderRegistryProperties properties) {
        providers.clear();
        for (ProviderRegistryProperties.ProviderConfig providerConfig : properties.getProviders()) {
            List<ModelDescriptor> models = providerConfig.getModels().stream()
                .map(modelConfig -> ModelDescriptor.builder()
                    .providerId(providerConfig.getId())
                    .modelId(modelConfig.getId())
                    .type(modelConfig.getType())
                    .capabilities(modelConfig.getCapabilities())
                    .inputCost(modelConfig.getPricing().getInputCost())
                    .outputCost(modelConfig.getPricing().getOutputCost())
                    .currency(modelConfig.getPricing().getCurrency())
                    .fallbackPriority(modelConfig.getFallbackPriority())
                    .build())
                .collect(Collectors.toUnmodifiableList());

            ProviderDescriptor descriptor = ProviderDescriptor.builder()
                .id(providerConfig.getId())
                .displayName(providerConfig.getDisplayName())
                .enabled(providerConfig.isEnabled())
                .models(models)
                .build();
            providers.put(descriptor.getId(), descriptor);
        }
    }
}
