import gql from "graphql-tag";

export const CREATE_TEAM_MUTATION = gql`
	mutation CreateTeamMutation($name: String!) {
		createTeam(name: $name) {
			... on Error {
				path
				message
			}
			... on Team {
				id
				name
			}
		}
	}
`;
