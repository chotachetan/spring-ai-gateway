package com.example.gateway.core.exception;

/**
 * Thrown when the invocation pipeline cannot resolve a matching model based on
 * the incoming request.
 */
public class ModelNotFoundException extends RuntimeException {

    public ModelNotFoundException(String message) {
        super(message);
    }
}
