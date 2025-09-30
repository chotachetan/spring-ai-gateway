package com.example.gateway.observability;

import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.boot.actuate.autoconfigure.observation.ObservationAutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configures baseline observability customisations such as common metric tags.
 */
@Configuration
@AutoConfigureAfter(ObservationAutoConfiguration.class)
@ConfigurationPropertiesScan
public class ObservabilityConfiguration {

    /**
     * Adds a default {@code application} tag to all metrics when a registry is available.
     */
    @Bean
    @ConditionalOnClass(MeterRegistry.class)
    MeterRegistryCustomizer meterRegistryCustomizer() {
        return new MeterRegistryCustomizer();
    }

    /** Simple customiser that applies the gateway tag. */
    public static class MeterRegistryCustomizer implements org.springframework.boot.actuate.autoconfigure.metrics.MeterRegistryCustomizer<MeterRegistry> {

        @Override
        public void customize(MeterRegistry registry) {
            registry.config().commonTags("application", "spring-ai-gateway");
        }
    }
}
