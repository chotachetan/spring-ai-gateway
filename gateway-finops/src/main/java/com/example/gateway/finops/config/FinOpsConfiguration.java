package com.example.gateway.finops.config;

import com.example.gateway.finops.cache.CacheService;
import com.example.gateway.finops.cache.CachingInvocationFilter;
import com.example.gateway.finops.cache.RequestFingerprintCalculator;
import com.example.gateway.finops.usage.SpendTrackingInvocationFilter;
import com.example.gateway.finops.usage.UsageRecorder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * FinOps module configuration exposing caching and spend tracking filters.
 */
@Configuration
public class FinOpsConfiguration {

    @Bean
    CachingInvocationFilter cachingInvocationFilter(CacheService cacheService, RequestFingerprintCalculator fingerprintCalculator) {
        return new CachingInvocationFilter(cacheService, fingerprintCalculator);
    }

    @Bean
    SpendTrackingInvocationFilter spendTrackingInvocationFilter(UsageRecorder usageRecorder) {
        return new SpendTrackingInvocationFilter(usageRecorder);
    }
}
