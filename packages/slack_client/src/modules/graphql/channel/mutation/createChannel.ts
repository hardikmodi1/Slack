import gql from "graphql-tag";

export const CREATE_CHANNEL_MUTATION = gql`
	mutation CreateChannelMutation(
		$name: String!
		$isPublic: Boolean!
		$teamId: Float!
		$members: [String!]
	) {
		createChannel(
			data: {
				name: $name
				isPublic: $isPublic
				teamId: $teamId
				members: $members
			}
		) {
			... on Error {
				path
				message
			}
			... on Channel {
				id
				name
			}
		}
	}
`;
