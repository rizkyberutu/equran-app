// components/layout/Footer.tsx
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-muted flex items-center gap-2">
            Made with <Heart className="size-4 text-danger fill-danger" /> for
            the Ummah
          </p>
          <p className="text-xs text-dimmed">
            Data from{" "}
            <a
              href="https://equran.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              equran.id
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
