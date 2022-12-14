import { Failure, Initialized, Pending, Success } from '@abraham/remotedata';
import { createSelector } from '@reduxjs/toolkit';
import { Member } from '../../models/member';
import { Team, TeamWithoutMembers } from '../../models/team';
import { selectMembers } from '../members/selectors';
import { MembersState } from '../members/state';
import { selectTeams } from '../teams/selectors';
import { TeamsState } from '../teams/state';
import { TeamsMembersState } from './state';

const mergeMembers = (team: TeamWithoutMembers, index: number, possibleMembers: Member[]): Team => {
  const isCoreTeam = index === 0;
  const members = possibleMembers.filter((member) => member.parentId === team.id);

  return {
    ...team,
    members: isCoreTeam ? members.sort((a, b) => a.order - b.order) : members,
  };
};

export const selectTeamsAndMembers = createSelector(
  selectTeams,
  selectMembers,
  (teams: TeamsState, members: MembersState): TeamsMembersState => {
    if (teams instanceof Success && members instanceof Success) {
      const merged = teams.data
        .sort((a, b) => a.order - b.order)
        .map((team, index) => mergeMembers(team, index, members.data));
      return new Success(merged);
    } else if (teams instanceof Pending || members instanceof Pending) {
      return new Pending();
    } else if (teams instanceof Failure) {
      return new Failure(teams.error);
    } else if (members instanceof Failure) {
      return new Failure(members.error);
    } else {
      return new Initialized();
    }
  }
);
