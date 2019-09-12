import { Comment, List } from "antd";
import * as React from "react";
import { useQuery } from "react-apollo";
import {
	AllDirectMessagesQueryQuery,
	AllDirectMessagesQueryQueryVariables,
	NewDirectMessageSubscriptionSubscription,
	NewDirectMessageSubscriptionSubscriptionVariables
} from "src/generated/graphqlTypes";
import { ALL_DIRECT_MESSAGES_QUERY } from "src/modules/graphql/directMessage/query/allDirectMessages";
import { NEW_DIRECT_MEESSAGE_SUBSCRIPTION } from "src/modules/graphql/directMessage/subscription/newDirectMessage";
import Messages from "./styled-components/Messages";

interface Props {
	teamId: number;
	otherUserId: number;
}

const DirectMessageContainer: React.FC<Props> = ({ teamId, otherUserId }) => {
	const { data, subscribeToMore, loading } = useQuery<
		AllDirectMessagesQueryQuery,
		AllDirectMessagesQueryQueryVariables
	>(ALL_DIRECT_MESSAGES_QUERY, {
		variables: { teamId, otherUserId },
		fetchPolicy: "network-only"
	});
	React.useEffect(() => {
		const unsubscribe = subscribeToMore<
			NewDirectMessageSubscriptionSubscription,
			NewDirectMessageSubscriptionSubscriptionVariables
		>({
			document: NEW_DIRECT_MEESSAGE_SUBSCRIPTION,
			variables: { userId: otherUserId, teamId },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) {
					return prev;
				}
				return {
					...prev,
					allDirectMessages: [
						...prev.allDirectMessages,
						subscriptionData.data.newDirectMessage
					]
				};
			}
		});
		return () => {
			unsubscribe();
		};
	}, [otherUserId]);
	if (loading) {
		return <div>Loading messages...</div>;
	}
	if (!data) {
		return <div>Error in fetching messages</div>;
	}
	return (
		<Messages>
			{data!.allDirectMessages && (
				<List
					className="comment-list"
					itemLayout="horizontal"
					dataSource={data!.allDirectMessages}
					renderItem={message => (
						<li>
							<Comment
								author={message.sender.username}
								content={message.text || ""}
								datetime={message.time}
							/>
						</li>
					)}
				/>
			)}
		</Messages>
	);
};

export default DirectMessageContainer;
