package com.example.gateway.sample.web;

import jakarta.validation.constraints.NotBlank;

/**
 * Request payload for the sample chat endpoint.
 */
public class ChatRequest {

    private String provider;
    private String model;

    @NotBlank
    private String prompt;

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }
}
