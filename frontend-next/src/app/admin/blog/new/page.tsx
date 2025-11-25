import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { BlogForm } from "@/components/admin/blog/BlogForm";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/blog">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold font-heading">Novo Post</h1>
          <p className="text-muted-foreground mt-1">Crie um novo artigo para o blog</p>
        </div>
      </div>

      {/* Form */}
      <BlogForm mode="create" />
    </div>
  );
}
