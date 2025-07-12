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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Pen, PlusCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AddSkillForm } from '@/components/dashboard/add-skill-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Skill } from '@/lib/types';
import { UserContext } from '@/context/UserContext';

function SkillsSection({
  title,
  skills,
  onAddSkill,
}: {
  title: string;
  skills: Skill[];
  onAddSkill: () => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-headline">{title}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onAddSkill}>
          <PlusCircle className="h-5 w-5" />
          <span className="sr-only">Add Skill</span>
        </Button>
      </CardHeader>
      <CardContent>
        {skills.length > 0 ? (
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={skill.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {skill.description}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Pen className="h-4 w-4" />
                  </Button>
                </div>
                {index < skills.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No skills listed yet.</p>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { user, setUser } = useContext(UserContext);
  const [isAddSkillOpen, setAddSkillOpen] = useState(false);
  
  if (!user) {
    return <div>Loading...</div>;
  }

  const handleVisibilityChange = (checked: boolean) => {
    setUser({ ...user, profilePublic: checked });
  };


  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl font-headline">{user.name}</CardTitle>
                <CardDescription>{user.location}</CardDescription>
              </div>
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href="/dashboard/settings">Edit Profile</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{user.availability}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Profile Visibility</CardTitle>
            <CardDescription>
              Set your profile to public or private.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch 
                id="profile-visibility" 
                checked={user.profilePublic} 
                onCheckedChange={handleVisibilityChange}
              />
              <Label htmlFor="profile-visibility">Public</Label>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Dialog open={isAddSkillOpen} onOpenChange={setAddSkillOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-headline">Add a New Skill</DialogTitle>
            </DialogHeader>
            <AddSkillForm onFinished={() => setAddSkillOpen(false)} />
          </DialogContent>
        </Dialog>

        <SkillsSection
          title="Skills I Offer"
          skills={user.skillsOffered}
          onAddSkill={() => setAddSkillOpen(true)}
        />
        <SkillsSection
          title="Skills I'm Looking For"
          skills={user.skillsRequested}
          onAddSkill={() => setAddSkillOpen(true)}
        />
      </div>
    </div>
  );
}
