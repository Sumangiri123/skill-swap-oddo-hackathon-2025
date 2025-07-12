'use client';

import { useState, useContext } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MessageSquarePlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockUsers } from '@/lib/data';
import type { User } from '@/lib/types';
import { UserContext } from '@/context/UserContext';
import { RequestSwapDialog } from '@/components/dashboard/request-swap-dialog';

export default function BrowsePage() {
  const { user: currentUser } = useContext(UserContext);
  const publicUsers = mockUsers.filter(
    (user) => user.profilePublic && user.id !== currentUser?.id
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(publicUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(publicUsers);
      return;
    }

    const lowercasedTerm = searchTerm.toLowerCase();
    const results = publicUsers.filter((user) =>
      user.skillsOffered.some((skill) =>
        skill.name.toLowerCase().includes(lowercasedTerm)
      )
    );
    setFilteredUsers(results);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Browse Skills
        </h1>
        <p className="text-muted-foreground">
          Find talented people and propose a skill swap.
        </p>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="search"
          placeholder="Search skills like 'Photoshop'..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button type="submit" onClick={handleSearch}>
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Card key={user.id}>
              <CardHeader className="flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg font-headline">
                    {user.name}
                  </CardTitle>
                  <CardDescription>{user.location}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Offers:</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.map((skill) => (
                      <Badge key={skill.id} variant="secondary">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Wants:</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsRequested.map((skill) => (
                      <Badge key={skill.id} variant="outline">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setSelectedUser(user)}>
                  <MessageSquarePlus className="mr-2 h-4 w-4" />
                  Request Swap
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground col-span-full text-center">
            No users found with that skill.
          </p>
        )}
      </div>

       {selectedUser && currentUser && (
        <RequestSwapDialog
          isOpen={!!selectedUser}
          onOpenChange={(isOpen) => !isOpen && setSelectedUser(null)}
          currentUser={currentUser}
          targetUser={selectedUser}
        />
      )}
    </div>
  );
}
