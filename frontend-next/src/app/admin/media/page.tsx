"use client";

import { useState } from "react";
import { MediaUploader } from "@/components/admin/media/MediaUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, FileText, Upload } from "lucide-react";

export default function MediaLibraryPage() {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Biblioteca de Mídia</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie imagens, PDFs e outros arquivos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" disabled>
            <FileText className="w-4 h-4 mr-2" />
            Exportar Lista
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="images">
            <ImageIcon className="w-4 h-4 mr-2" />
            Imagens
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="w-4 h-4 mr-2" />
            Documentos
          </TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload de Imagens</CardTitle>
              <CardDescription>
                Arraste e solte imagens ou clique para selecionar. Máximo de 10 imagens por vez (4MB cada).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MediaUploader
                endpoint="imageUploader"
                maxFiles={10}
                onUploadComplete={(urls) => {
                  setUploadedUrls(urls);
                  console.log("URLs uploaded:", urls);
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload de PDFs</CardTitle>
              <CardDescription>
                Faça upload de documentos PDF (máximo 8MB).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MediaUploader
                endpoint="pdfUploader"
                maxFiles={1}
                onUploadComplete={(urls) => {
                  console.log("PDF uploaded:", urls);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>Galeria de Imagens</CardTitle>
              <CardDescription>
                Todas as imagens enviadas aparecerão aqui
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Em desenvolvimento - Listagem de imagens do banco de dados</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Biblioteca de Documentos</CardTitle>
              <CardDescription>
                Todos os PDFs e documentos enviados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Em desenvolvimento - Listagem de documentos do banco de dados</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Debug Info */}
      {uploadedUrls.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>URLs Carregadas</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-4 rounded overflow-auto">
              {JSON.stringify(uploadedUrls, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
