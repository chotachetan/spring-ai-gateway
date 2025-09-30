package com.example.gateway.finops.cache;

import com.example.gateway.core.pipeline.InvocationResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.redis.core.ReactiveStringRedisTemplate;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

/**
 * Reactive Redis-backed implementation of {@link CacheService}. Payloads are
 * serialised using Jackson for portability.
 */
@Component
public class RedisCacheService implements CacheService {

    private final ReactiveStringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;

    public RedisCacheService(ReactiveStringRedisTemplate redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    @Override
    public Mono<InvocationResponse> get(String key) {
        return redisTemplate.opsForValue()
            .get(key)
            .flatMap(this::deserialize);
    }

    @Override
    public Mono<Void> put(String key, InvocationResponse response) {
        return serialize(response)
            .flatMap(serialized -> redisTemplate.opsForValue().set(key, serialized).then())
            .onErrorResume(JsonProcessingException.class, ex -> Mono.empty());
    }

    private Mono<InvocationResponse> deserialize(String serialized) {
        return Mono.fromCallable(() -> objectMapper.readValue(serialized, InvocationResponse.class));
    }

    private Mono<String> serialize(InvocationResponse response) {
        return Mono.fromCallable(() -> objectMapper.writeValueAsString(response));
    }
}
