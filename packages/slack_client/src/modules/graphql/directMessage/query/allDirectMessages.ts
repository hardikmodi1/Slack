import gql from "graphql-tag";

export const ALL_DIRECT_MESSAGES_QUERY = gql`
	query AllDirectMessagesQuery($otherUserId: Float!, $teamId: Float!) {
		allDirectMessages(otherUserId: $otherUserId, teamId: $teamId) {
			id
			text
			time
			sender {
				username
			}
		}
	}
`;
