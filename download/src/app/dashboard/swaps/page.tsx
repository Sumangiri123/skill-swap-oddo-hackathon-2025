'use client';

import { useState, useContext } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { SwapRequest } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { UserContext } from '@/context/UserContext';

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
  },
  accepted: {
    label: 'Accepted',
    className: 'bg-green-500/20 text-green-700 border-green-500/30',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-500/20 text-red-700 border-red-500/30',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-gray-500/20 text-gray-700 border-gray-500/30',
  },
};

function SwapRequestCard({ 
  swap, 
  onUpdateStatus,
  currentUserId
}: { 
  swap: SwapRequest, 
  onUpdateStatus: (id: string, status: 'accepted' | 'rejected' | 'cancelled') => void,
  currentUserId?: string 
}) {
  const isOutgoing = swap.fromUser.id === currentUserId;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
            <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                <AvatarImage src={swap.fromUser.avatarUrl} />
                <AvatarFallback>{swap.fromUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                <CardTitle className="text-base">{isOutgoing ? `To: ${swap.toUser.name}` : `From: ${swap.fromUser.name}`}</CardTitle>
                <CardDescription>{swap.createdAt}</CardDescription>
                </div>
            </div>
            </div>
            <Badge variant="outline" className={cn('capitalize', statusConfig[swap.status].className)}>{statusConfig[swap.status].label}</Badge>
        </div>

      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-4 text-center text-sm">
            <div className="flex-1 rounded-md border p-2 bg-card">
                <p className="font-semibold">{isOutgoing ? "You Offer" : `${swap.fromUser.name} Offers`}</p>
                <p className="text-muted-foreground">{swap.offeredSkill.name}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
            <div className="flex-1 rounded-md border p-2 bg-card">
                <p className="font-semibold">{isOutgoing ? "You Request" : `${swap.fromUser.name} Requests`}</p>
                <p className="text-muted-foreground">{swap.requestedSkill.name}</p>
            </div>
        </div>
        <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
          "{swap.message}"
        </p>
      </CardContent>
      {swap.status === 'pending' && (
        <CardFooter className="flex justify-end gap-2">
          {isOutgoing ? (
            <Button variant="destructive" onClick={() => onUpdateStatus(swap.id, 'cancelled')}>
              <Trash2 className="mr-2 h-4 w-4" /> Cancel
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => onUpdateStatus(swap.id, 'rejected')}>
                <X className="mr-2 h-4 w-4" /> Reject
              </Button>
              <Button onClick={() => onUpdateStatus(swap.id, 'accepted')}>
                <Check className="mr-2 h-4 w-4" /> Accept
              </Button>
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

export default function SwapsPage() {
  const { toast } = useToast();
  const { user, swaps, setSwaps } = useContext(UserContext);

  if (!user) {
    return <div>Loading...</div>;
  }
  
  const handleUpdateSwap = (id: string, status: 'accepted' | 'rejected' | 'cancelled') => {
    setSwaps(swaps.map(s => s.id === id ? { ...s, status } : s));
    toast({
        title: `Swap ${status}!`,
        description: `The request has been moved to the ${status === 'accepted' ? 'active' : 'history'} tab.`,
    });
  };

  const relevantSwaps = swaps.filter(s => s.fromUser.id === user.id || s.toUser.id === user.id);
  
  const pendingSwaps = relevantSwaps.filter((s) => s.status === 'pending');
  const activeSwaps = relevantSwaps.filter((s) => s.status === 'accepted');
  const historySwaps = relevantSwaps.filter(
    (s) => s.status === 'rejected' || s.status === 'cancelled'
  );

  const SwapList = ({ swapsToShow }: { swapsToShow: SwapRequest[] }) => (
    <div className="space-y-4">
      {swapsToShow.length > 0 ? (
        swapsToShow.map((swap) => (
            <SwapRequestCard 
                key={swap.id} 
                swap={swap}
                onUpdateStatus={handleUpdateSwap}
                currentUserId={user.id}
            />
        ))
      ) : (
        <p className="text-muted-foreground text-center py-8">No swaps here.</p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Manage Swaps
        </h1>
        <p className="text-muted-foreground">
          View your active, pending, and past skill swaps.
        </p>
      </div>
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <SwapList swapsToShow={pendingSwaps} />
        </TabsContent>
        <TabsContent value="active">
          <SwapList swapsToShow={activeSwaps} />
        </TabsContent>
        <TabsContent value="history">
          <SwapList swapsToShow={historySwaps} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
