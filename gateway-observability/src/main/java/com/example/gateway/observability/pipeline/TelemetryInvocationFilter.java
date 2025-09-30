package com.example.gateway.observability.pipeline;

import com.example.gateway.core.pipeline.InvocationContext;
import com.example.gateway.core.pipeline.InvocationFilter;
import com.example.gateway.core.pipeline.InvocationResponse;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import java.util.concurrent.atomic.AtomicReference;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

/**
 * Filter that records invocation duration metrics using Micrometer. The filter
 * runs late in the chain to capture latency regardless of cache hits or
 * failures.
 */
@Component
public class TelemetryInvocationFilter implements InvocationFilter, Ordered {

    private final MeterRegistry meterRegistry;

    public TelemetryInvocationFilter(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }

    @Override
    public Mono<InvocationResponse> filter(InvocationContext context, Chain chain) {
        String model = context.getRequest().getModelHint();
        String provider = context.getRequest().getProviderHint();
        Timer.Sample sample = Timer.start(meterRegistry);
        AtomicReference<String> outcome = new AtomicReference<>("success");

        return chain.next(context)
            .doOnError(throwable -> outcome.set("error"))
            .doFinally(signalType -> sample.stop(Timer.builder("gateway.invocation.duration")
                .tag("model", model != null ? model : "unknown")
                .tag("provider", provider != null ? provider : "auto")
                .tag("outcome", outcome.get())
                .register(meterRegistry)));
    }

    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE - 10;
    }
}
