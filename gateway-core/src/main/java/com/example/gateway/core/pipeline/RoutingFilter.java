package com.example.gateway.core.pipeline;

import com.example.gateway.core.exception.ModelNotFoundException;
import com.example.gateway.core.model.ModelDescriptor;
import com.example.gateway.core.model.ProviderDescriptor;
import com.example.gateway.core.registry.ProviderRegistry;
import java.util.Optional;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

/**
 * Filter responsible for resolving the provider/model combination that should
 * handle the invocation. Provider hints take precedence, otherwise the filter
 * attempts to locate a matching model across all enabled providers.
 */
@Component
public class RoutingFilter implements InvocationFilter, Ordered {

    private final ProviderRegistry providerRegistry;

    public RoutingFilter(ProviderRegistry providerRegistry) {
        this.providerRegistry = providerRegistry;
    }

    @Override
    public Mono<InvocationResponse> filter(InvocationContext context, Chain chain) {
        InvocationRequest request = context.getRequest();
        String providerHint = request.getProviderHint();
        String modelHint = request.getModelHint();

        if (modelHint == null) {
            return Mono.error(new ModelNotFoundException("Model hint is required to route the request"));
        }

        if (providerHint != null) {
            Optional<ProviderDescriptor> provider = providerRegistry.findProvider(providerHint);
            Optional<ModelDescriptor> model = providerRegistry.findModel(providerHint, modelHint);
            if (provider.isPresent() && model.isPresent()) {
                return chainNext(chain, context, provider.get(), model.get());
            }
            return Mono.error(new ModelNotFoundException("Model " + modelHint + " not available for provider " + providerHint));
        }

        return providerRegistry.listProviders().stream()
            .filter(ProviderDescriptor::isEnabled)
            .flatMap(provider -> provider.getModels().stream()
                .filter(model -> model.getModelId().equals(modelHint))
                .map(model -> new ProviderModelPair(provider, model)))
            .findFirst()
            .map(pair -> chainNext(chain, context, pair.provider(), pair.model()))
            .orElseGet(() -> Mono.error(new ModelNotFoundException("Model " + modelHint + " not configured")));
    }

    private Mono<InvocationResponse> chainNext(Chain chain, InvocationContext context, ProviderDescriptor provider, ModelDescriptor model) {
        context.setProvider(provider);
        context.setModel(model);
        return chain.next(context);
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE + 10;
    }

    private record ProviderModelPair(ProviderDescriptor provider, ModelDescriptor model) { }
}
