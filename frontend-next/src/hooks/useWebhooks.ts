"use client";

import { useState, useEffect } from "react";
import { listWebhooks } from "@/lib/actions/webhook-actions";

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  isActive: boolean;
  _count: {
    logs: number;
  };
}

export function useWebhooks() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWebhooks = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await listWebhooks();

      if (result.success && result.webhooks) {
        setWebhooks(result.webhooks as Webhook[]);
      } else {
        setError(result.error || "Erro ao carregar webhooks");
      }
    } catch {
      setError("Erro inesperado ao carregar webhooks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebhooks();
  }, []);

  return {
    webhooks,
    loading,
    error,
    refetch: fetchWebhooks,
  };
}
