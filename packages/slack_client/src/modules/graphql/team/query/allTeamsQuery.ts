import gql from "graphql-tag";

export const TEAMS_QUERY = gql`
	query TeamsQuery {
		teams {
			isOwner
			team {
				id
				name
				channels {
					id
					name
					public
					dmChannel
					memberCount
				}
			}
		}
	}
`;
