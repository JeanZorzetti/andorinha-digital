"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteSettingsSchema, type SiteSettingsFormData } from "@/lib/validations/settings-schema";
import { updateSiteSettings, toggleMaintenanceMode } from "@/lib/actions/settings-actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Save, Globe, Mail, Image, Settings2, Share2, BarChart3, Wrench } from "lucide-react";
import type { SiteSettings } from "@prisma/client";

interface GeneralSettingsFormProps {
  initialData: SiteSettings;
}

export function GeneralSettingsForm({ initialData }: GeneralSettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(initialData.maintenanceMode);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SiteSettingsFormData>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      siteName: initialData.siteName,
      siteDescription: initialData.siteDescription || "",
      siteUrl: initialData.siteUrl,
      contactEmail: initialData.contactEmail,
      supportEmail: initialData.supportEmail || "",
      phone: initialData.phone || "",
      logo: initialData.logo || "",
      favicon: initialData.favicon || "",
      ogImage: initialData.ogImage || "",
      timezone: initialData.timezone,
      language: initialData.language,
      dateFormat: initialData.dateFormat,
      timeFormat: initialData.timeFormat,
      facebookUrl: initialData.facebookUrl || "",
      instagramUrl: initialData.instagramUrl || "",
      linkedinUrl: initialData.linkedinUrl || "",
      twitterUrl: initialData.twitterUrl || "",
      youtubeUrl: initialData.youtubeUrl || "",
      defaultMetaTitle: initialData.defaultMetaTitle || "",
      defaultMetaDescription: initialData.defaultMetaDescription || "",
      googleAnalyticsId: initialData.googleAnalyticsId || "",
      facebookPixelId: initialData.facebookPixelId || "",
      googleTagManager: initialData.googleTagManager || "",
      clarityId: initialData.clarityId || "",
      maintenanceMessage: initialData.maintenanceMessage || "",
    },
  });

  async function onSubmit(data: SiteSettingsFormData) {
    setIsSubmitting(true);

    try {
      const result = await updateSiteSettings({
        ...data,
        maintenanceMode,
      });

      if (result.success) {
        toast.success("Configurações atualizadas com sucesso!");
      } else {
        toast.error(result.error || "Erro ao atualizar configurações");
      }
    } catch (error) {
      console.error("Error submitting settings:", error);
      toast.error("Erro ao salvar configurações");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleToggleMaintenance() {
    try {
      const result = await toggleMaintenanceMode();

      if (result.success && result.maintenanceMode !== undefined) {
        setMaintenanceMode(result.maintenanceMode);
        toast.success(
          result.maintenanceMode
            ? "Modo de manutenção ativado"
            : "Modo de manutenção desativado"
        );
      } else {
        toast.error(result.error || "Erro ao alternar modo de manutenção");
      }
    } catch (error) {
      console.error("Error toggling maintenance:", error);
      toast.error("Erro ao alternar modo de manutenção");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic" className="gap-2">
            <Globe className="h-4 w-4" />
            Básico
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2">
            <Mail className="h-4 w-4" />
            Contato
          </TabsTrigger>
          <TabsTrigger value="branding" className="gap-2">
            <Image className="h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="localization" className="gap-2">
            <Settings2 className="h-4 w-4" />
            Localização
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-2">
            <Share2 className="h-4 w-4" />
            Redes Sociais
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="gap-2">
            <Wrench className="h-4 w-4" />
            Manutenção
          </TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Informações Básicas</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="siteName">Nome do Site *</Label>
                <Input
                  id="siteName"
                  {...register("siteName")}
                  placeholder="Andorinha Digital"
                />
                {errors.siteName && (
                  <p className="text-sm text-destructive mt-1">{errors.siteName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="siteDescription">Descrição do Site</Label>
                <Textarea
                  id="siteDescription"
                  {...register("siteDescription")}
                  placeholder="Agência de marketing digital..."
                  rows={4}
                />
                {errors.siteDescription && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.siteDescription.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="siteUrl">URL do Site *</Label>
                <Input
                  id="siteUrl"
                  {...register("siteUrl")}
                  placeholder="https://andorinha.digital"
                  type="url"
                />
                {errors.siteUrl && (
                  <p className="text-sm text-destructive mt-1">{errors.siteUrl.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="defaultMetaTitle">Meta Title Padrão</Label>
                <Input
                  id="defaultMetaTitle"
                  {...register("defaultMetaTitle")}
                  placeholder="Andorinha Digital - Marketing Digital"
                />
              </div>

              <div>
                <Label htmlFor="defaultMetaDescription">Meta Description Padrão</Label>
                <Textarea
                  id="defaultMetaDescription"
                  {...register("defaultMetaDescription")}
                  placeholder="Agência especializada em marketing digital..."
                  rows={3}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Informações de Contato</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="contactEmail">Email de Contato *</Label>
                <Input
                  id="contactEmail"
                  {...register("contactEmail")}
                  type="email"
                  placeholder="contato@andorinha.digital"
                />
                {errors.contactEmail && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.contactEmail.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="supportEmail">Email de Suporte</Label>
                <Input
                  id="supportEmail"
                  {...register("supportEmail")}
                  type="email"
                  placeholder="suporte@andorinha.digital"
                />
                {errors.supportEmail && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.supportEmail.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="+55 11 1234-5678"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Logo e Imagens</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  {...register("logo")}
                  placeholder="https://..."
                  type="url"
                />
                {errors.logo && (
                  <p className="text-sm text-destructive mt-1">{errors.logo.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="favicon">Favicon URL</Label>
                <Input
                  id="favicon"
                  {...register("favicon")}
                  placeholder="https://..."
                  type="url"
                />
              </div>

              <div>
                <Label htmlFor="ogImage">Open Graph Image (Default)</Label>
                <Input
                  id="ogImage"
                  {...register("ogImage")}
                  placeholder="https://..."
                  type="url"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Imagem padrão para compartilhamento em redes sociais (1200x630px)
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Localization Tab */}
        <TabsContent value="localization" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Configurações Regionais</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="timezone">Timezone *</Label>
                <Input
                  id="timezone"
                  {...register("timezone")}
                  placeholder="America/Sao_Paulo"
                />
              </div>

              <div>
                <Label htmlFor="language">Idioma *</Label>
                <Input id="language" {...register("language")} placeholder="pt-BR" />
              </div>

              <div>
                <Label htmlFor="dateFormat">Formato de Data *</Label>
                <Input id="dateFormat" {...register("dateFormat")} placeholder="dd/MM/yyyy" />
              </div>

              <div>
                <Label htmlFor="timeFormat">Formato de Hora *</Label>
                <Input id="timeFormat" {...register("timeFormat")} placeholder="HH:mm" />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="facebookUrl">Facebook</Label>
                <Input
                  id="facebookUrl"
                  {...register("facebookUrl")}
                  placeholder="https://facebook.com/..."
                />
              </div>

              <div>
                <Label htmlFor="instagramUrl">Instagram</Label>
                <Input
                  id="instagramUrl"
                  {...register("instagramUrl")}
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div>
                <Label htmlFor="linkedinUrl">LinkedIn</Label>
                <Input
                  id="linkedinUrl"
                  {...register("linkedinUrl")}
                  placeholder="https://linkedin.com/..."
                />
              </div>

              <div>
                <Label htmlFor="twitterUrl">Twitter/X</Label>
                <Input
                  id="twitterUrl"
                  {...register("twitterUrl")}
                  placeholder="https://twitter.com/..."
                />
              </div>

              <div>
                <Label htmlFor="youtubeUrl">YouTube</Label>
                <Input
                  id="youtubeUrl"
                  {...register("youtubeUrl")}
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Analytics e Tracking</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input
                  id="googleAnalyticsId"
                  {...register("googleAnalyticsId")}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>

              <div>
                <Label htmlFor="googleTagManager">Google Tag Manager</Label>
                <Input
                  id="googleTagManager"
                  {...register("googleTagManager")}
                  placeholder="GTM-XXXXXXX"
                />
              </div>

              <div>
                <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                <Input
                  id="facebookPixelId"
                  {...register("facebookPixelId")}
                  placeholder="1234567890"
                />
              </div>

              <div>
                <Label htmlFor="clarityId">Microsoft Clarity ID</Label>
                <Input id="clarityId" {...register("clarityId")} placeholder="abcdefgh" />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Modo de Manutenção</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Ativar Modo de Manutenção</p>
                  <p className="text-sm text-muted-foreground">
                    O site ficará inacessível para visitantes
                  </p>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={handleToggleMaintenance}
                />
              </div>

              <div>
                <Label htmlFor="maintenanceMessage">Mensagem de Manutenção</Label>
                <Textarea
                  id="maintenanceMessage"
                  {...register("maintenanceMessage")}
                  placeholder="Estamos em manutenção. Voltaremos em breve!"
                  rows={4}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
