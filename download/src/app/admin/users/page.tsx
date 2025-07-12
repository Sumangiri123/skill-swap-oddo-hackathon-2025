import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, ShieldOff } from 'lucide-react';
import { mockUsers } from '@/lib/data';
import { Input } from '@/components/ui/input';

export default function AdminUsersPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          User Management
        </h1>
        <p className="text-muted-foreground">
          View, manage, and moderate all users on the platform.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            A list of all users in the system.
          </CardDescription>
          <div className="pt-4">
            <Input placeholder="Filter users by name or email..." className="max-w-sm" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Skills Offered</TableHead>
                <TableHead className="hidden md:table-cell">Joined On</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5">
                        <span className="font-semibold">{user.name}</span>
                        <span className="text-sm text-muted-foreground">{user.location}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsOffered.slice(0, 2).map((skill) => (
                        <Badge key={skill.id} variant="secondary">
                          {skill.name}
                        </Badge>
                      ))}
                       {user.skillsOffered.length > 2 && <Badge variant="outline">+{user.skillsOffered.length - 2}</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    2023-06-23
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <ShieldOff className="mr-2 h-4 w-4" />
                          Ban User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
