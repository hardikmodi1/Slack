import { Input, List, Modal } from "antd";
import { DataProxy } from "apollo-cache";
import Downshift from "downshift";
import findIndex from "lodash/findIndex";
import * as React from "react";
import { useMutation, useQuery } from "react-apollo";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import {
	Channel,
	GetAllTeamMembersQueryQuery,
	GetAllTeamMembersQueryQueryVariables,
	GetOrCreateDmChannelMutationMutation,
	GetOrCreateDmChannelMutationMutationVariables
} from "src/generated/graphqlTypes";
import { GET_OR_CREATE_DM_CHANNEL_MUTATION } from "src/modules/graphql/channel/mutation/getOrCreateDMChannel";
import { TEAMS_QUERY } from "../../../graphql/team/query/allTeamsQuery";
import { GET_ALL_TEAM_MEMBERS_QUERY } from "../../../graphql/team/query/getAllTeamMembers";

interface Props {
	open: boolean;
	handleCancel: () => void;
	teamId: string;
	teamIdx: number;
}

const DirectMessageModal: React.FC<Props & RouteComponentProps<{}>> = ({
	history,
	open,
	handleCancel,
	teamId,
	teamIdx
}) => {
	const { data, loading } = useQuery<
		GetAllTeamMembersQueryQuery,
		GetAllTeamMembersQueryQueryVariables
	>(GET_ALL_TEAM_MEMBERS_QUERY, {
		variables: {
			teamId
		}
	});
	// const client = useApolloClient();
	const [getOrCreateDmChannel] = useMutation<
		GetOrCreateDmChannelMutationMutation,
		GetOrCreateDmChannelMutationMutationVariables
	>(GET_OR_CREATE_DM_CHANNEL_MUTATION);
	return (
		<Modal
			title="Direct Message"
			visible={open}
			onCancel={handleCancel}
			okText="Create Channel"
			footer={[]}
		>
			<Downshift
				onChange={async selectedUser => {
					if (!selectedUser) {
						return;
					}
					const { data: response } = await getOrCreateDmChannel({
						variables: {
							teamId,
							member: selectedUser.id
						},
						update(cache: DataProxy, { data: mutationResult }) {
							const cacheData: any = cache.readQuery({
								query: TEAMS_QUERY
							});
							if (
								mutationResult &&
								(mutationResult as any).getOrCreateDMChannel[0]
									.id
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
							} else {
								return;
							}
						}
					});
					if (
						response &&
						response.getOrCreateDMChannel[0].__typename ===
							"Channel"
					) {
						history.push(
							`/view-team/${teamId}/${response.getOrCreateDMChannel[0].id}`
						);
						handleCancel();
					}
				}}
				itemToString={item => (item ? item.value : "")}
			>
				{({
					getInputProps,
					getItemProps,
					getLabelProps,
					getMenuProps,
					isOpen,
					inputValue,
					highlightedIndex,
					selectedItem
				}) => (
					<div>
						<List
							{...getMenuProps()}
							header={
								<div>
									<label {...getLabelProps()}>
										Start typing Username / Email
									</label>
									<Input {...getInputProps()} />
								</div>
							}
							bordered={true}
						>
							{isOpen && !loading
								? data!.getAllTeamMembers
										.filter(
											user =>
												!inputValue ||
												user.username.includes(
													inputValue
												) ||
												user.email.includes(inputValue)
										)
										.map((item, index) => (
											<List.Item
												{...getItemProps({
													key: item.id,
													index,
													item,
													style: {
														backgroundColor:
															highlightedIndex ===
															index
																? "lightgray"
																: "white",
														fontWeight:
															selectedItem ===
															item
																? "bold"
																: "normal"
													}
												})}
											>
												<Link
													to={`/view-team/user/${teamId}/${item.id}`}
												>
													<List.Item.Meta
														title={item.username}
														description={item.email}
													/>
												</Link>
											</List.Item>
										))
								: null}
						</List>
					</div>
				)}
			</Downshift>
		</Modal>
	);
};
export default withRouter(DirectMessageModal);
