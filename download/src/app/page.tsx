import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, LogIn } from 'lucide-react';
import { Logo as LogoIcon } from '@/components/logo';

const Logo = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0ZM40.096 42.896L13.104 15.904C14.896 14.112 16.968 12.6 19.264 11.424L44.576 36.736C43.4 39.032 41.888 41.104 40.096 42.896ZM42.896 40.096L15.904 13.104C17.696 11.312 19.768 9.8 22.064 8.624L47.376 33.936C46.2 36.232 44.688 38.304 42.896 40.096Z"
      className="fill-primary"
    />
  </svg>
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <LogoIcon />
          </Link>
          <Button asChild variant="ghost">
            <Link href="/login?role=user">
              Login
              <LogIn className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tighter text-foreground">
              Swap Skills, Share Knowledge.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              SkillHub is a community where you can exchange your talents.
              Offer what you know, learn what you don't, and grow together.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/signup">
                  Join as a User
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/login?role=admin">Login as Admin</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} SkillHub. All rights reserved.</p>
      </footer>
    </div>
  );
}