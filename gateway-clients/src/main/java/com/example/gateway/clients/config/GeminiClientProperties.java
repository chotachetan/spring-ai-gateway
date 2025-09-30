package com.example.gateway.clients.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("gateway.clients.gemini")
public class GeminiClientProperties {

    private String apiKey;
    private String baseUrl = "https://generativelanguage.googleapis.com/v1beta/models";
    private String defaultModel = "gemini-1.5-flash";

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
