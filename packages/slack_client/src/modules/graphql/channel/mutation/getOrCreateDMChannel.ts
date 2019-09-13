import gql from "graphql-tag";

export const GET_OR_CREATE_DM_CHANNEL_MUTATION = gql`
	mutation GetOrCreateDMChannelMutation($teamId: String!, $member: String!) {
		getOrCreateDMChannel(teamId: $teamId, member: $member) {
			... on Error {
				path
				message
			}
			... on Channel {
				id
				name
				dmChannel
			}
		}
	}
`;
