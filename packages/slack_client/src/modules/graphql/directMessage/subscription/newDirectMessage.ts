import gql from "graphql-tag";

export const NEW_DIRECT_MEESSAGE_SUBSCRIPTION = gql`
	subscription NewDirectMessageSubscription(
		$userId: Float!
		$teamId: Float!
	) {
		newDirectMessage(userId: $userId, teamId: $teamId) {
			id
			text
			time
			sender {
				username
			}
		}
	}
`;
