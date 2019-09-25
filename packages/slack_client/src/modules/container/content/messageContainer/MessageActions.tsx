import { Icon, message as messagePop, Popover } from "antd";
import React from "react";
import { Message } from "src/generated/graphqlTypes";
import PinMessage from "./messageActions/PinMessage";
// @TODO:  update the two queries after message is pinned
interface Props {
	channelId: string;
	messageId: string;
	message: Message;
}

const MessageActions: React.FC<Props> = ({ channelId, messageId, message }) => {
	return (
		<>
			<Popover
				placement="leftTop"
				title={"Actions"}
				content={
					<div>
						<PinMessage
							channelId={channelId}
							messageId={messageId}
						/>
						{!message.type && (
							<p
								className="messageAction"
								onClick={async () => {
									navigator.clipboard.writeText(
										message.text as string
									);
									messagePop.success(
										"Message is copied to clipboard"
									);
								}}
							>
								<Icon type="copy" className="icon-spacing" />
								Copy Message
							</p>
						)}
					</div>
				}
			>
				<Icon type="more" rotate={90} />
			</Popover>
		</>
	);
};

export default MessageActions;
