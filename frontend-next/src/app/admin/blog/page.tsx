import { Suspense } from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { BlogTable } from "@/components/admin/blog/BlogTable";

async function getBlogPosts() {
  const posts = await prisma.blogPost.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie artigos e conteúdo do blog
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Post
          </Button>
        </Link>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Todos os Posts ({posts.length})</CardTitle>
          <CardDescription>
            Listagem completa de todos os artigos do blog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Carregando...</div>}>
            <BlogTable data={posts} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
