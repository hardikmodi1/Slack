import gql from "graphql-tag";

export const CREATE_MESSAGE_MUTATION = gql`
	mutation CreateMessageMutation(
		$text: String
		$channelId: String!
		$file: Upload
	) {
		createMessage(data: { text: $text, channelId: $channelId }, file: $file)
	}
`;
