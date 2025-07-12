export type User = {
  id: string;
  name: string;
  location?: string;
  avatarUrl?: string;
  skillsOffered: Skill[];
  skillsRequested: Skill[];
  availability: string;
  profilePublic: boolean;
};

export type Skill = {
  id: string;
  name: string;
  description: string;
};

export type SwapRequest = {
  id: string;
  fromUser: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  toUser: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  offeredSkill: Skill;
  requestedSkill: Skill;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  message: string;
  createdAt: string;
};
