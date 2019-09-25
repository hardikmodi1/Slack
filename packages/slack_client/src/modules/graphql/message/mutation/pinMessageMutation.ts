import gql from "graphql-tag";

export const PIN_MESSAGE_MUTATION = gql`
	mutation PinMessageMutation($messageId: String!, $channelId: String!) {
		pinMessage(messageId: $messageId, channelId: $channelId)
	}
`;
