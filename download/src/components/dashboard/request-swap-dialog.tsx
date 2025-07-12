'use client';

import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { UserContext } from '@/context/UserContext';
import type { User, Skill, SwapRequest } from '@/lib/types';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  offeredSkillId: z.string({ required_error: 'Please select a skill to offer.' }),
  requestedSkillId: z.string({ required_error: 'Please select a skill to request.' }),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

interface RequestSwapDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentUser: User;
  targetUser: User;
}

export function RequestSwapDialog({
  isOpen,
  onOpenChange,
  currentUser,
  targetUser,
}: RequestSwapDialogProps) {
  const { toast } = useToast();
  const { swaps, setSwaps } = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    const newSwap: SwapRequest = {
      id: `swap-${Date.now()}`,
      fromUser: { id: currentUser.id, name: currentUser.name, avatarUrl: currentUser.avatarUrl },
      toUser: { id: targetUser.id, name: targetUser.name, avatarUrl: targetUser.avatarUrl },
      offeredSkill: currentUser.skillsOffered.find(s => s.id === values.offeredSkillId)!,
      requestedSkill: targetUser.skillsOffered.find(s => s.id === values.requestedSkillId)!,
      status: 'pending',
      message: values.message,
      createdAt: 'Just now',
    };

    setSwaps([newSwap, ...swaps]);

    setTimeout(() => {
        toast({
          title: 'Swap Request Sent!',
          description: `Your request has been sent to ${targetUser.name}.`,
        });
        setIsSubmitting(false);
        onOpenChange(false);
        form.reset();
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Request a Swap</DialogTitle>
          <DialogDescription>
            Propose a skill exchange with {targetUser.name}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="offeredSkillId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>You Offer</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a skill you offer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currentUser.skillsOffered.map((skill) => (
                        <SelectItem key={skill.id} value={skill.id}>
                          {skill.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requestedSkillId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>You Request</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a skill you want" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {targetUser.skillsOffered.map((skill) => (
                        <SelectItem key={skill.id} value={skill.id}>
                          {skill.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Hi ${targetUser.name}, I'd like to propose a swap...`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Request
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
