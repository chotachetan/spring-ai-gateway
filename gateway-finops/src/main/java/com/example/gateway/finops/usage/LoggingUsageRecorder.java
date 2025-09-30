package com.example.gateway.finops.usage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

/**
 * Baseline {@link UsageRecorder} that logs usage events. This can be replaced
 * with a persistent implementation when backing storage is introduced.
 */
@Component
public class LoggingUsageRecorder implements UsageRecorder {

    private static final Logger logger = LoggerFactory.getLogger(LoggingUsageRecorder.class);

    @Override
    public Mono<Void> record(UsageRecord record) {
        return Mono.fromRunnable(() -> logger.info("Usage: provider={}, model={}, cost={}",
                record.getProviderId(), record.getModelId(), record.getCost()));
    }
}
