import Link from 'next/link';
import { Logo } from '@/components/logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2">
            <Logo />
        </Link>
      </div>
      {children}
    </div>
  );
}