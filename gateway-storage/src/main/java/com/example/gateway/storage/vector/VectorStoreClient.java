package com.example.gateway.storage.vector;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Abstraction over vector store implementations used for embeddings.
 */
public interface VectorStoreClient {

    /** Inserts or updates a vector record. */
    Mono<Void> upsert(VectorStoreRecord record);

    /** Performs a similarity search for the supplied embedding. */
    Flux<VectorStoreRecord> search(String tenantId, float[] embedding, int topK);
}
