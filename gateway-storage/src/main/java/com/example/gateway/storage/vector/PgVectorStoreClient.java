package com.example.gateway.storage.vector;

import io.r2dbc.spi.ConnectionFactory;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Minimal R2DBC implementation targeting PostgreSQL installations with the
 * pgvector extension enabled.
 */
@Component
public class PgVectorStoreClient implements VectorStoreClient {

    private final DatabaseClient databaseClient;

    public PgVectorStoreClient(ConnectionFactory connectionFactory) {
        this.databaseClient = DatabaseClient.create(connectionFactory);
    }

    @Override
    public Mono<Void> upsert(VectorStoreRecord record) {
        return databaseClient.sql("INSERT INTO ai_embeddings(id, tenant_id, embedding, metadata) VALUES (:id, :tenant, :embedding, :metadata) "
                + "ON CONFLICT (id) DO UPDATE SET embedding = EXCLUDED.embedding, metadata = EXCLUDED.metadata")
            .bind("id", record.getId())
            .bind("tenant", record.getTenantId())
            .bind("embedding", record.getEmbedding())
            .bind("metadata", record.getMetadata())
            .then();
    }

    @Override
    public Flux<VectorStoreRecord> search(String tenantId, float[] embedding, int topK) {
        return databaseClient.sql("SELECT id, tenant_id, embedding, metadata FROM ai_embeddings WHERE tenant_id = :tenant LIMIT :limit")
            .bind("tenant", tenantId)
            .bind("limit", topK)
            .map(row -> {
                VectorStoreRecord record = new VectorStoreRecord();
                record.setId(row.get("id", String.class));
                record.setTenantId(row.get("tenant_id", String.class));
                record.setEmbedding((float[]) row.get("embedding"));
                record.setMetadata(row.get("metadata", java.util.Map.class));
                return record;
            })
            .all();
    }
}
