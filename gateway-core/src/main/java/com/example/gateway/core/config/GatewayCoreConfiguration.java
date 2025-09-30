package com.example.gateway.core.config;

import com.example.gateway.core.pipeline.InvocationFilter;
import com.example.gateway.core.pipeline.InvocationPipeline;
import com.example.gateway.core.pipeline.ReactiveInvocationHandler;
import java.util.List;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Core configuration wiring the invocation pipeline and provider registry
 * properties.
 */
@Configuration
@EnableConfigurationProperties(ProviderRegistryProperties.class)
public class GatewayCoreConfiguration {

    /**
     * Builds the {@link InvocationPipeline} from registered filters and the
     * terminal handler.
     */
    @Bean
    InvocationPipeline invocationPipeline(List<InvocationFilter> filters, ReactiveInvocationHandler handler) {
        return new InvocationPipeline(filters, handler);
    }
}
