import gql from "graphql-tag";

export const TEAMS_QUERY = gql`
	query TeamsQuery {
		teams {
			isOwner
			team {
				id
				name
				directMessageUsers {
					id
					email
					username
				}
				channels {
					id
					name
					dmChannel
				}
			}
		}
	}
`;
