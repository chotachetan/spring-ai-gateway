package com.example.gateway.sample;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the sample application showcasing the AI gateway pipeline.
 */
@SpringBootApplication(scanBasePackages = "com.example.gateway")
public class SpringAiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringAiGatewayApplication.class, args);
    }
}
