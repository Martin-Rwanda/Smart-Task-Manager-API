CREATE TABLE IF NOT EXISTS blacklisted_tokens (
    id BIGSERIAL PRIMARY KEY,
    token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blacklisted_tokens_active 
    ON blacklisted_tokens(token) 
    WHERE expires_at > NOW();