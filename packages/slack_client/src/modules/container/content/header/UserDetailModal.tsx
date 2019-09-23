import { Button, Modal } from "antd";
import { DataProxy } from "apollo-cache";
import findIndex from "lodash/findIndex";
import * as React from "react";
import { useMutation } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import { GET_OR_CREATE_DM_CHANNEL_MUTATION } from "src/modules/graphql/channel/mutation/getOrCreateDMChannel";
import { TEAMS_QUERY } from "src/modules/graphql/team/query/allTeamsQuery";
import {
	Channel,
	GetOrCreateDmChannelMutationMutation,
	GetOrCreateDmChannelMutationMutationVariables,
	User
} from "../../../../generated/graphqlTypes";

interface Props {
	open: boolean;
	handleCancel: () => void;
	hideDrawer: () => void;
	user: User | undefined | null;
	teamId: string;
	teamIdx: number;
}

const UserDetailModal: React.FC<Props & RouteComponentProps<{}>> = ({
	history,
	open,
	handleCancel,
	hideDrawer,
	user,
	teamId,
	teamIdx
}) => {
	const [getOrCreateDmChannel] = useMutation<
		GetOrCreateDmChannelMutationMutation,
		GetOrCreateDmChannelMutationMutationVariables
	>(GET_OR_CREATE_DM_CHANNEL_MUTATION);
	async function handleMessageClick() {
		const { data: response } = await getOrCreateDmChannel({
			variables: {
				teamId,
				member: user ? user.id : ""
			},
			update(cache: DataProxy, { data: mutationResult }) {
				const cacheData: any = cache.readQuery({
					query: TEAMS_QUERY
				});
				if (
					mutationResult &&
					(mutationResult as any).getOrCreateDMChannel[0].id
				) {
					const channel: Channel = (mutationResult! as any)
						.getOrCreateDMChannel[0];
					const index = findIndex(
						cacheData.teams[teamIdx].team.channels,
						["id", channel.id]
					);
					if (index === -1) {
						cache.writeQuery({
							query: TEAMS_QUERY,
							data: (cacheData as any).teams[
								teamIdx
							].team.channels.push(channel)
						});
					}
					hideDrawer();
				} else {
					return;
				}
			}
		});
		if (
			response &&
			response.getOrCreateDMChannel[0].__typename === "Channel"
		) {
			history.push(`/${teamId}/${response.getOrCreateDMChannel[0].id}`);
			handleCancel();
		}
	}
	return (
		<Modal
			title="Member Detail"
			visible={open}
			onCancel={() => {
				handleCancel();
			}}
			okText="Message"
			footer={[
				<Button key="message" onClick={handleMessageClick}>
					Message
				</Button>
			]}
		>
			<strong>{user && user!.username}</strong>
			<p>{user && user!.email}</p>
		</Modal>
	);
};

export default withRouter(UserDetailModal);
