package com.example.gateway.clients.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Configuration properties for the OpenAI model client.
 */
@ConfigurationProperties("gateway.clients.openai")
public class OpenAiClientProperties {

    private String apiKey;
    private String baseUrl = "https://api.openai.com/v1/chat/completions";
    private String defaultModel = "gpt-4o-mini";

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getDefaultModel() {
        return defaultModel;
    }

    public void setDefaultModel(String defaultModel) {
        this.defaultModel = defaultModel;
    }
}
