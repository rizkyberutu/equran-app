// components/common/UnderDevelopment.tsx
"use client";

import { Card, CardBody } from "@/components/selia/card";
import { Badge } from "@/components/selia/badge";
import { IconBox } from "@/components/selia/icon-box";
import { Construction, Sparkles, Calendar } from "lucide-react";

interface UnderDevelopmentProps {
  title?: string;
  description?: string;
  estimatedDate?: string;
}

export function UnderDevelopment({
  title = "Coming Soon",
  description = "We're working hard to bring you this feature. Stay tuned!",
  estimatedDate,
}: UnderDevelopmentProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full">
        <CardBody className="p-12 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <IconBox variant="primary" size="xl" className="relative">
              <Construction className="size-12" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="size-6 text-yellow-500 animate-pulse" />
              </div>
            </IconBox>
          </div>

          {/* Badge */}
          <Badge variant="primary-outline" size="lg">
            Under Development
          </Badge>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
            <p className="text-muted max-w-md mx-auto">{description}</p>
          </div>

          {/* Estimated Date */}
          {estimatedDate && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted">
              <Calendar className="size-4" />
              <span>Expected: {estimatedDate}</span>
            </div>
          )}

          {/* Progress Animation */}
          <div className="pt-6">
            <div className="flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="size-3 rounded-full bg-primary animate-bounce"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
