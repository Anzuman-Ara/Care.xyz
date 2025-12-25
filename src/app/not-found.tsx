import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="container section flex items-center justify-center flex-1">
        <div className="card max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            The page you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="btn-primary inline-block"
          >
            Return to Home
          </Link>
        </div>
      </main>
    </div>
  );
}