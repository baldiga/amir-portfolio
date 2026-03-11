import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-32">
      <div className="text-center">
        <h1 className="font-heading text-9xl font-bold mb-4">404</h1>
        <p className="text-3xl font-semibold mb-8">Page Not Found</p>
        <Link href="/" className="btn-primary inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
