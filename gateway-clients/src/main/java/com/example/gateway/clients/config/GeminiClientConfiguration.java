package com.example.gateway.clients.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * Provides the {@link WebClient} bean used to communicate with Google Gemini.
 */
@Configuration
@EnableConfigurationProperties(GeminiClientProperties.class)
public class GeminiClientConfiguration {

    @Bean
    @Qualifier("geminiWebClient")
    WebClient geminiWebClient(WebClient.Builder builder, GeminiClientProperties properties) {
        return builder.clone()
            .baseUrl(properties.getBaseUrl())
            .exchangeStrategies(ExchangeStrategies.builder()
                .codecs(cfg -> cfg.defaultCodecs().maxInMemorySize(4 * 1024 * 1024))
                .build())
            .build();
    }
}
