import gql from "graphql-tag";

export const GET_ALL_TEAM_MEMBERS_QUERY = gql`
	query GetAllTeamMembersQuery($teamId: String!) {
		getAllTeamMembers(teamId: $teamId) {
			username
			email
			id
		}
	}
`;
