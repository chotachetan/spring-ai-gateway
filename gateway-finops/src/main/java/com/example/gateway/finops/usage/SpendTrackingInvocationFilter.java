package com.example.gateway.finops.usage;

import com.example.gateway.core.pipeline.InvocationContext;
import com.example.gateway.core.pipeline.InvocationFilter;
import com.example.gateway.core.pipeline.InvocationResponse;
import java.time.Instant;
import java.util.Map;
import org.springframework.core.Ordered;
import reactor.core.publisher.Mono;

/**
 * Late-stage filter that records usage metrics after a successful provider
 * invocation. Recorded data can be used for dashboarding or billing.
 */
public class SpendTrackingInvocationFilter implements InvocationFilter, Ordered {

    private final UsageRecorder usageRecorder;

    public SpendTrackingInvocationFilter(UsageRecorder usageRecorder) {
        this.usageRecorder = usageRecorder;
    }

    @Override
    public Mono<InvocationResponse> filter(InvocationContext context, Chain chain) {
        return chain.next(context)
            .flatMap(response -> usageRecorder.record(buildRecord(context, response)).thenReturn(response));
    }

    private UsageRecord buildRecord(InvocationContext context, InvocationResponse response) {
        Map<String, Object> metadata = response.getMetadata();
        long inputTokens = ((Number) metadata.getOrDefault("inputTokens", 0)).longValue();
        long outputTokens = ((Number) metadata.getOrDefault("outputTokens", 0)).longValue();
        double cost = ((Number) metadata.getOrDefault("cost", 0.0)).doubleValue();
        UsageRecord record = new UsageRecord();
        record.setProviderId(context.getProvider() != null ? context.getProvider().getId() : "unknown");
        record.setModelId(context.getModel() != null ? context.getModel().getModelId() : "unknown");
        record.setInputTokens(inputTokens);
        record.setOutputTokens(outputTokens);
        record.setCost(cost);
        record.setTimestamp(Instant.now());
        return record;
    }

    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE - 20;
    }
}
