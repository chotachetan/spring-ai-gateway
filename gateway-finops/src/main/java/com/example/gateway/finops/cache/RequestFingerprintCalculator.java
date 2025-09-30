package com.example.gateway.finops.cache;

import com.example.gateway.core.pipeline.InvocationRequest;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import org.springframework.stereotype.Component;

/**
 * Creates deterministic cache keys for invocation requests using SHA-256
 * hashes. The fingerprint combines provider/model hints with the request
 * payload to maximise cache hit rates while avoiding collisions.
 */
@Component
public class RequestFingerprintCalculator {

    private static final HexFormat HEX = HexFormat.of();

    /**
     * Generates a fingerprint for the provided request.
     */
    public String fingerprint(InvocationRequest request) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            /*
             * Provider/model hints and payload content are combined to ensure
             * that requests targeting different models do not reuse cached
             * responses. Null hints are treated as empty strings.
             */
            digest.update(safeBytes(request.getProviderHint()));
            digest.update(safeBytes(request.getModelHint()));
            digest.update(request.getPayload().toString().getBytes(StandardCharsets.UTF_8));
            return HEX.formatHex(digest.digest());
        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException("SHA-256 not available", ex);
        }
    }

    private byte[] safeBytes(String value) {
        return value != null ? value.getBytes(StandardCharsets.UTF_8) : new byte[0];
    }
}
