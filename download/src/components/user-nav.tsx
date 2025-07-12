'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CreditCard, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { UserContext } from '@/context/UserContext';


type UserNavProps = {
  isAdmin?: boolean;
};

export function UserNav({ isAdmin = false }: UserNavProps) {
  const { user } = useContext(UserContext);
  const admin = { name: 'Admin User', email: 'admin@skillhub.com' };

  const displayUser = isAdmin ? admin : user;
  
  if (!displayUser && !isAdmin) {
      return (
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9" />
        </Button>
      )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={isAdmin ? 'https://placehold.co/100x100.png' : displayUser.avatarUrl}
              alt={displayUser.name}
              data-ai-hint={isAdmin ? 'abstract pattern' : 'person smiling'}
            />
            <AvatarFallback>{displayUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {displayUser.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {isAdmin ? admin.email : 'user@example.com'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={isAdmin ? '/admin' : '/dashboard'}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={isAdmin ? '/admin/settings' : '/dashboard/settings'}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          {!isAdmin && (
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
