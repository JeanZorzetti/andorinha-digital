"use client";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Bell, CheckCheck, Trash2, Info, AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { markAsRead, markAllAsRead, deleteNotification } from "@/lib/actions/notification-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Notification {
  id: string;
  type: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
  title: string;
  message: string;
  link?: string | null;
  read: boolean;
  createdAt: Date;
}

interface NotificationListProps {
  notifications: Notification[];
  loading: boolean;
  onRefresh: () => void;
}

const typeConfig = {
  INFO: {
    icon: Info,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  SUCCESS: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  WARNING: {
    icon: AlertTriangle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  ERROR: {
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
};

export function NotificationList({ notifications, loading, onRefresh }: NotificationListProps) {
  const router = useRouter();

  const handleMarkAsRead = async (id: string) => {
    const result = await markAsRead(id);
    if (result.success) {
      onRefresh();
    } else {
      toast.error("Erro ao marcar como lida");
    }
  };

  const handleMarkAllAsRead = async () => {
    const result = await markAllAsRead();
    if (result.success) {
      toast.success("Todas marcadas como lidas");
      onRefresh();
    } else {
      toast.error("Erro ao marcar todas como lidas");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteNotification(id);
    if (result.success) {
      toast.success("Notificação removida");
      onRefresh();
    } else {
      toast.error("Erro ao remover notificação");
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    // Marcar como lida
    if (!notification.read) {
      await handleMarkAsRead(notification.id);
    }

    // Navegar para o link se existir
    if (notification.link) {
      router.push(notification.link);
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Carregando notificações...
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center">
        <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground">Nenhuma notificação</p>
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b">
        <div>
          <h3 className="font-semibold">Notificações</h3>
          {unreadCount > 0 && (
            <p className="text-xs text-muted-foreground">
              {unreadCount} não {unreadCount === 1 ? "lida" : "lidas"}
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
            <CheckCheck className="w-4 h-4 mr-2" />
            Marcar todas
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <ScrollArea className="h-[400px]">
        {notifications.map((notification, index) => {
          const config = typeConfig[notification.type];
          const Icon = config.icon;

          return (
            <div key={notification.id}>
              <div
                className={`p-4 transition-colors ${
                  !notification.read ? "bg-blue-50/50" : "hover:bg-muted/50"
                } ${notification.link ? "cursor-pointer" : ""}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex gap-3">
                  <div className={`p-2 rounded-lg ${config.bgColor} h-fit`}>
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className={`text-sm font-medium ${!notification.read ? "font-semibold" : ""}`}>
                        {notification.title}
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(notification.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>
              </div>
              {index < notifications.length - 1 && <Separator />}
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
}
