import gql from "graphql-tag";

export const CREATE_DIRECT_MESSAGE_MUTATION = gql`
	mutation CreateDirectMessageMutation(
		$text: String!
		$receiverId: Float!
		$teamId: Float!
	) {
		createDirectMessage(
			text: $text
			receiverId: $receiverId
			teamId: $teamId
		)
	}
`;
