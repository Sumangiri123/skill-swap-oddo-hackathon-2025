import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockUsers } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, ShieldQuestion, X } from 'lucide-react';

const flaggedSkills = [
  {
    user: mockUsers[1],
    skill: {
      name: 'Financial "Advice"',
      description: 'I can show you how to get rich quick with crypto. Guaranteed returns! Not financial advice.',
    },
    reason: 'Potentially misleading financial claims.',
  },
  {
    user: mockUsers[2],
    skill: {
      name: 'Lockpicking',
      description: 'Learn how to open any lock without a key. For educational purposes only, of course.',
    },
    reason: 'Promotes potentially illegal activities.',
  },
  {
    user: mockUsers[3],
    skill: {
      name: 'Hacking 101',
      description: 'I will teach you how to access any wifi network and read other people\'s emails.',
    },
    reason: 'Promotes illegal and harmful activities.',
  },
];

export default function AdminModerationPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Content Moderation
        </h1>
        <p className="text-muted-foreground">
          Review skills flagged for inappropriate content.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldQuestion className="h-6 w-6" />
            Moderation Queue
          </CardTitle>
          <CardDescription>
            {flaggedSkills.length} skills require your review.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {flaggedSkills.map((item, index) => (
            <div key={index} className="rounded-lg border p-4 space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{item.skill.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Submitted by <span className="font-medium text-foreground">{item.user.name}</span>
                    </p>
                  </div>
                  <Badge variant="destructive">{item.reason}</Badge>
                </div>
                <Separator className="my-2" />
                <p className="text-sm p-2 bg-muted rounded-md">{item.skill.description}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline"><X className="mr-2 h-4 w-4" /> Reject Skill</Button>
                <Button><Check className="mr-2 h-4 w-4" /> Approve Skill</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
