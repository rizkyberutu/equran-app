// app/[locale]/not-found.tsx
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardBody } from "@/components/selia/card";
import { IconBox } from "@/components/selia/icon-box";
import { Badge } from "@/components/selia/badge";
import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <PageContainer>
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full">
          <CardBody className="p-12 text-center space-y-6">
            <div className="flex justify-center">
              <IconBox variant="danger" size="xl">
                <AlertCircle className="size-12" />
              </IconBox>
            </div>

            <Badge variant="danger-outline" size="lg">
              404 Error
            </Badge>

            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">Page Not Found</h1>
              <p className="text-muted max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Home className="size-4" />
              Back to Home
            </Link>
          </CardBody>
        </Card>
      </div>
    </PageContainer>
  );
}
