package com.example.gateway.finops.cache;

import com.example.gateway.core.pipeline.InvocationContext;
import com.example.gateway.core.pipeline.InvocationFilter;
import com.example.gateway.core.pipeline.InvocationResponse;
import org.springframework.core.Ordered;
import reactor.core.publisher.Mono;

/**
 * Early pipeline filter that attempts to serve responses from cache before
 * contacting upstream providers.
 */
public class CachingInvocationFilter implements InvocationFilter, Ordered {

    private final CacheService cacheService;
    private final RequestFingerprintCalculator fingerprintCalculator;

    public CachingInvocationFilter(CacheService cacheService, RequestFingerprintCalculator fingerprintCalculator) {
        this.cacheService = cacheService;
        this.fingerprintCalculator = fingerprintCalculator;
    }

    @Override
    public Mono<InvocationResponse> filter(InvocationContext context, Chain chain) {
        String fingerprint = fingerprintCalculator.fingerprint(context.getRequest());
        return cacheService.get(fingerprint)
            .switchIfEmpty(chain.next(context)
                .flatMap(response -> cacheService.put(fingerprint, response).thenReturn(response)));
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}
