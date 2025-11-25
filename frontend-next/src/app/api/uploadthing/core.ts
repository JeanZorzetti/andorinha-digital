import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  // Image uploader para blog, cases, serviços
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async () => {
      // Verificar autenticação
      const session = await getServerSession(authOptions);

      if (!session || (session.user.role !== "ADMIN" && session.user.role !== "admin")) {
        throw new Error("Unauthorized");
      }

      // Metadados disponíveis no onUploadComplete
      return { userId: session.user.id, userName: session.user.name };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Salvar informações no banco (opcional)
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // Retornar dados para o client
      return { uploadedBy: metadata.userName, url: file.url };
    }),

  // PDF uploader (para materiais, manuais, etc)
  pdfUploader: f({ pdf: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session || (session.user.role !== "ADMIN" && session.user.role !== "admin")) {
        throw new Error("Unauthorized");
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("PDF uploaded:", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
