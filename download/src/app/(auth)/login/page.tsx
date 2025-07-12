import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage({ searchParams }: { searchParams: { role?: string } }) {
  const role = searchParams.role || 'user';
  const isAdmin = role === 'admin';

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">
          {isAdmin ? 'Admin Login' : 'Login'}
        </CardTitle>
        <CardDescription>
          {isAdmin
            ? 'Access the admin dashboard.'
            : "Don't have an account? "}
          {!isAdmin && (
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={isAdmin ? '/admin' : '/dashboard'}>Sign in</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
