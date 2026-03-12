#!/usr/bin/env bun
/**
 * Secrets View - Interactive TUI for browsing AWS Secrets Manager
 */

import React, { useState, useEffect, useCallback } from "react";
import { Box, Text, useApp, useInput } from "ink";
import {
  SecretsManagerClient,
  ListSecretsCommand,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import {
  App,
  renderApp,
  List,
  Card,
  Spinner,
  StatusMessage,
  CopyFeedback,
  IdentityCard,
  ACTIONS,
  useIdentity,
  useCopy,
  getAwsClientConfig,
  formatJson,
  type ListItemData,
} from "@toolbox/common";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface SecretInfo {
  name: string;
  arn: string;
  description?: string;
}

type ViewState = "list" | "detail";

// ─────────────────────────────────────────────────────────────────────────────
// AWS Operations
// ─────────────────────────────────────────────────────────────────────────────

async function listSecrets(client: SecretsManagerClient): Promise<SecretInfo[]> {
  const secrets: SecretInfo[] = [];
  let nextToken: string | undefined;

  do {
    const cmd = new ListSecretsCommand({ NextToken: nextToken, MaxResults: 100 });
    const resp = await client.send(cmd);

    for (const secret of resp.SecretList || []) {
      if (!secret.Name || !secret.ARN) continue;
      secrets.push({
        name: secret.Name,
        arn: secret.ARN,
        description: secret.Description,
      });
    }
    nextToken = resp.NextToken;
  } while (nextToken);

  return secrets.sort((a, b) => a.name.localeCompare(b.name));
}

async function getSecretValue(client: SecretsManagerClient, secretId: string): Promise<string> {
  const cmd = new GetSecretValueCommand({ SecretId: secretId });
  const resp = await client.send(cmd);
  return resp.SecretString || "(binary secret)";
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook: useSecrets
// ─────────────────────────────────────────────────────────────────────────────

function useSecrets() {
  const [secrets, setSecrets] = useState<SecretInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const client = new SecretsManagerClient(getAwsClientConfig());

  const fetchSecrets = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await listSecrets(client);
      setSecrets(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch secrets");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSecretValue = useCallback(async (arn: string) => {
    return await getSecretValue(client, arn);
  }, []);

  useEffect(() => {
    fetchSecrets();
  }, [fetchSecrets]);

  return { secrets, loading, error, refresh: fetchSecrets, fetchSecretValue };
}

// ─────────────────────────────────────────────────────────────────────────────
// Secret Detail Component
// ─────────────────────────────────────────────────────────────────────────────

interface SecretDetailProps {
  secret: SecretInfo;
  onBack: () => void;
  fetchSecretValue: (arn: string) => Promise<string>;
}

function SecretDetail({ secret, onBack, fetchSecretValue }: SecretDetailProps) {
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { copy, copied, error: copyError } = useCopy();
  const { exit } = useApp();

  useEffect(() => {
    let cancelled = false;
    fetchSecretValue(secret.arn).then((v) => {
      if (!cancelled) {
        setValue(v);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [secret.arn, fetchSecretValue]);

  // Handle keyboard for copy and back
  useInput((input, key) => {
    if (input === "c" && value) {
      copy(value);
    }
    if (input === "b" || key.escape) {
      onBack();
    }
  });

  return (
    <App
      title="Secrets View"
      icon="🔐"
      color="magenta"
      actions={[
        { keys: "c", label: "Copy" },
        ACTIONS.back,
        ACTIONS.quit,
      ]}
      onQuit={() => exit()}
    >
      <Card title="Secret">
        <Text bold color="cyan">{secret.name}</Text>
        {secret.description && (
          <Text dimColor> - {secret.description}</Text>
        )}
      </Card>

      {loading ? (
        <Spinner label="Loading secret value..." />
      ) : (
        <Box flexDirection="column">
          <Box
            borderStyle="round"
            borderColor="gray"
            paddingX={1}
            paddingY={0}
            flexDirection="column"
          >
            <Box marginTop={-1} marginLeft={1}>
              <Text dimColor> Value </Text>
            </Box>
            <Text>{formatJson(value || "")}</Text>
          </Box>

          <CopyFeedback copied={copied} error={copyError} />
        </Box>
      )}
    </App>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

function SecretsView() {
  const { identity, loading: identityLoading, error: identityError } = useIdentity();
  const { secrets, loading: secretsLoading, error: secretsError, refresh, fetchSecretValue } = useSecrets();
  const { copy, copied, error: copyError } = useCopy();
  const [selectedSecret, setSelectedSecret] = useState<SecretInfo | null>(null);
  const [view, setView] = useState<ViewState>("list");

  // Convert to list items
  const items: ListItemData[] = secrets.map((secret) => ({
    id: secret.arn,
    label: secret.name,
    description: secret.description,
    value: secret,
  }));

  // Handle selection
  const handleSelect = (item: ListItemData) => {
    setSelectedSecret(item.value as SecretInfo);
    setView("detail");
  };

  // Handle copy from list
  const handleCopy = async (item: ListItemData) => {
    const secret = item.value as SecretInfo;
    const value = await fetchSecretValue(secret.arn);
    copy(value);
  };

  // Handle back
  const handleBack = () => {
    setSelectedSecret(null);
    setView("list");
  };

  // Show detail view
  if (view === "detail" && selectedSecret) {
    return (
      <SecretDetail
        secret={selectedSecret}
        onBack={handleBack}
        fetchSecretValue={fetchSecretValue}
      />
    );
  }

  const isLoading = identityLoading || secretsLoading;
  const error = identityError || secretsError;

  return (
    <App
      title="Secrets View"
      icon="🔐"
      color="magenta"
      actions={[
        ACTIONS.navigate,
        ACTIONS.select,
        ACTIONS.copy,
        ACTIONS.refresh,
        ACTIONS.quit,
      ]}
    >
      {/* AWS Identity */}
      <IdentityCard
        identity={identity}
        loading={identityLoading}
        error={identityError}
      />

      {/* Loading */}
      {secretsLoading && !identityLoading && (
        <Spinner label="Fetching secrets..." />
      )}

      {/* Error */}
      {error && !isLoading && (
        <StatusMessage type="error">{error}</StatusMessage>
      )}

      {/* Secret List */}
      {!isLoading && (
        <>
          <Box marginBottom={1}>
            <Text>
              <Text color="magenta">?</Text> Select a secret
              {secrets.length > 0 && (
                <Text dimColor> ({secrets.length} found)</Text>
              )}
            </Text>
          </Box>

          <List
            items={items}
            onSelect={handleSelect}
            onRefresh={refresh}
            actions={[{ key: "c", handler: handleCopy }]}
            emptyMessage="No secrets found in this account/region"
            maxVisible={10}
          />

          <CopyFeedback copied={copied} error={copyError} />
        </>
      )}
    </App>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Entry Point
// ─────────────────────────────────────────────────────────────────────────────

renderApp(<SecretsView />);
