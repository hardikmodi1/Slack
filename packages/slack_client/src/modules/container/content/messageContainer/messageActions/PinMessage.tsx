import { Icon, message } from "antd";
import React from "react";
import { useMutation } from "react-apollo";
import {
	PinMessageMutationMutation,
	PinMessageMutationMutationVariables
} from "../../../../../generated/graphqlTypes";
import { PIN_MESSAGE_MUTATION } from "../../../../graphql/message/mutation/pinMessageMutation";

interface Props {
	channelId: string;
	messageId: string;
}

const PinMessage: React.FC<Props> = ({ channelId, messageId }) => {
	const [pinMessage] = useMutation<
		PinMessageMutationMutation,
		PinMessageMutationMutationVariables
	>(PIN_MESSAGE_MUTATION);
	return (
		<p
			className="messageAction"
			onClick={async () => {
				navigator.clipboard.writeText("hello");
				await pinMessage({
					variables: { channelId, messageId }
				});
				message.success("Message is pinned");
			}}
		>
			<Icon type="pushpin" style={{ paddingRight: "5px" }} />
			Pin this Message
		</p>
	);
};

export default PinMessage;
