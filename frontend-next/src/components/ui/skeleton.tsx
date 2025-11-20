import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
    </div>
  );
}

function SkeletonBlogPost() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <div className="pt-4">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}

function SkeletonList({ items = 3 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
          <Skeleton className="w-6 h-6 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

function SkeletonPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary-dark to-secondary py-20">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-2/3 mx-auto mb-4 bg-white/20" />
          <Skeleton className="h-6 w-1/2 mx-auto bg-white/20" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonBlogPost, SkeletonList, SkeletonPage };
