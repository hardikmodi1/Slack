import { Col, Comment, Divider, List, Row } from "antd";
import * as React from "react";
import { useQuery } from "react-apollo";
import {
	AllMessagesQueryQuery,
	AllMessagesQueryQueryVariables,
	NewMessageSubscriptionSubscription,
	NewMessageSubscriptionSubscriptionVariables
} from "src/generated/graphqlTypes";
import { ALL_MESSAGES_QUERY } from "src/modules/graphql/message/query/allMessagesQuery";
import { NEW_MEESSAGE_SUBSCRIPTION } from "../../../modules/graphql/message/subscription/newessage";
import AttachFile from "./AttachFile";
import DisplayMessae from "./messageContainer/DisplayMessage";
import MessageActions from "./messageContainer/MessageActions";
import { expandDate } from "./shared/expandDate";

interface Props {
	channelId: string;
}

const MessageContainer: React.FC<Props> = ({ channelId }) => {
	const scrollRef = React.useRef<HTMLDivElement | null>(null);
	const [hasMoreMessages, setHasMoreMessage] = React.useState<boolean>(true);
	const { data, subscribeToMore, fetchMore } = useQuery<
		AllMessagesQueryQuery,
		AllMessagesQueryQueryVariables
	>(ALL_MESSAGES_QUERY, {
		variables: { channelId, offset: 0 },
		fetchPolicy: "network-only"
	});
	React.useEffect(() => {
		const unsubscribe = subscribeToMore<
			NewMessageSubscriptionSubscription,
			NewMessageSubscriptionSubscriptionVariables
		>({
			document: NEW_MEESSAGE_SUBSCRIPTION,
			variables: { channelId },
			updateQuery: (prev: any, { subscriptionData }) => {
				if (!subscriptionData.data) {
					return prev;
				}
				const newMessage = {
					...subscriptionData.data.newMessage,
					time: new Date().toISOString()
				};
				return {
					...prev,
					allMessages: [...prev.allMessages, newMessage]
				};
			}
		});
		return () => {
			unsubscribe();
			setHasMoreMessage(true);
		};
	}, [channelId]);

	function handleScroll() {
		if (
			scrollRef.current &&
			scrollRef.current.scrollTop <= 0 &&
			hasMoreMessages &&
			data &&
			data.allMessages.length >= 15
		) {
			fetchMore({
				variables: {
					channelId,
					offset: data.allMessages.length
				},
				updateQuery: (previousResult, { fetchMoreResult }) => {
					if (!fetchMoreResult) {
						return previousResult;
					}
					if (fetchMoreResult.allMessages.length < 15) {
						setHasMoreMessage(false);
					}
					console.log(previousResult.allMessages.length);
					return {
						...previousResult,
						allMessages: [
							...fetchMoreResult.allMessages,
							...previousResult.allMessages
						]
					};
				}
			});
		}
	}
	return (
		<div
			ref={scrollRef}
			onScroll={handleScroll}
			style={{
				gridColumn: "3",
				gridRow: "2",
				paddingLeft: "20px",
				paddingRight: "20px",
				overflowY: "auto",
				display: "flex",
				flexDirection: "column-reverse"
			}}
		>
			<AttachFile disableClick={true} channelId={channelId}>
				{data && data!.allMessages && (
					<div>
						<List
							className="comment-list"
							itemLayout="horizontal"
							dataSource={data!.allMessages}
							renderItem={(message, index) => (
								<li>
									{index === 0 && (
										<Divider>
											{expandDate(new Date(message.time))}
										</Divider>
									)}
									{index > 0 &&
										new Date(
											message.time
										).toLocaleDateString() !==
											new Date(
												data!.allMessages[
													index - 1
												].time
											).toLocaleDateString() && (
											<Divider>
												{expandDate(
													new Date(message.time)
												)}
											</Divider>
										)}
									<div className="message">
										<Row>
											<Col
												span={1}
												offset={23}
												className="messageActions"
											>
												<MessageActions
													message={message}
													channelId={channelId}
													messageId={message.id}
												/>
											</Col>
										</Row>
										<Row>
											<Comment
												author={message.user!.username}
												content={
													<DisplayMessae
														message={message}
													/>
												}
												datetime={`${new Date(
													message.time
												).getHours()}:${new Date(
													message.time
												).getMinutes()}`}
											/>
										</Row>
									</div>
								</li>
							)}
						/>
					</div>
				)}
			</AttachFile>
		</div>
	);
};

export default MessageContainer;
