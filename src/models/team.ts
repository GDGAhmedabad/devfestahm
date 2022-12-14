import { Member } from './member';

export interface Team {
  id: string;
  title: string;
  members: Member[];
  order: number;
}

export type TeamData = Pick<Team, 'title'>;

export type TeamWithoutMembers = Omit<Team, 'member'>;
