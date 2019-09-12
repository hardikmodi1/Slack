import gql from "graphql-tag";

export const GET_OR_CREATE_DM_CHANNEL_MUTATION = gql`
	mutation GetOrCreateDMChannelMutation(
		$teamId: String!
		$members: [String!]!
	) {
		getOrCreateDMChannel(teamId: $teamId, members: $members)
	}
`;
