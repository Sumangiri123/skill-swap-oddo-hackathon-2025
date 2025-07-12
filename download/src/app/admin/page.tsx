import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Swords,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockSwaps, mockUsers } from '@/lib/data';

export default function AdminDashboardPage() {
  const recentUsers = mockUsers.slice(0, 5);
  const pendingSwaps = mockSwaps.filter((s) => s.status === 'pending');

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Admin Overview
        </h1>
        <p className="text-muted-foreground">
          A high-level view of platform activity.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.length}</div>
            <p className="text-xs text-muted-foreground">+1 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Swaps</CardTitle>
            <Swords className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingSwaps.length}</div>
            <p className="text-xs text-muted-foreground">
              {pendingSwaps.length} requests need attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Skills to Moderate
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              3 new skills flagged by AI
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2</div>
            <p className="text-xs text-muted-foreground">
              Currently online
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Recent Users</CardTitle>
          <CardDescription>
            The latest users who have joined the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                  </TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>2 days ago</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-end">
            <Button asChild size="sm" variant="outline">
                <Link href="/admin/users">View All Users</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
