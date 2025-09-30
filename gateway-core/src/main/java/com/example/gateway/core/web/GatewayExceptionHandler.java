package com.example.gateway.core.web;

import com.example.gateway.core.exception.ModelNotFoundException;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Maps gateway-specific exceptions to structured HTTP responses that are
 * easier for API consumers to handle.
 */
@RestControllerAdvice
public class GatewayExceptionHandler {

    /** Handles cases where the requested model could not be located. */
    @ExceptionHandler(ModelNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleModelNotFound(ModelNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(Map.of(
                "error", "model-not-found",
                "message", exception.getMessage()
            ));
    }

    /** Handles generic validation errors thrown by filters or controllers. */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgument(IllegalArgumentException exception) {
        return ResponseEntity.badRequest()
            .body(Map.of(
                "error", "invalid-request",
                "message", exception.getMessage()
            ));
    }
}
