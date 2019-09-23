import { Collapse, Drawer, Icon, List } from "antd";
import React from "react";
import { useLazyQuery } from "react-apollo";
import { GET_CHANNEL_DETAILS_QUERY } from "src/modules/graphql/channel/query/getChannelDetailsQuery";
import { GET_USER_BY_ID_QUERY } from "src/modules/graphql/user/query/getUserByIdQuery";
import {
	Channel,
	GetChannelsDetailsQueryQuery,
	GetChannelsDetailsQueryQueryVariables,
	GetUserByIdQueryQuery,
	GetUserByIdQueryQueryVariables
} from "../../../../generated/graphqlTypes";
import { ChannelName } from "./styled-components";
import UserDetailModal from "./UserDetailModal";
const { Panel } = Collapse;

interface Props {
	channel: Channel;
	visible: boolean;
	onClose: () => void;
	teamId: string;
	teamIdx: number;
}

const ChannelInfo: React.FC<Props> = ({
	visible,
	onClose,
	channel,
	teamId,
	teamIdx
}) => {
	const [getChannelDetails, { loading, data }] = useLazyQuery<
		GetChannelsDetailsQueryQuery,
		GetChannelsDetailsQueryQueryVariables
	>(GET_CHANNEL_DETAILS_QUERY);
	const [getUserById, { data: channelDetail }] = useLazyQuery<
		GetUserByIdQueryQuery,
		GetUserByIdQueryQueryVariables
	>(GET_USER_BY_ID_QUERY);
	const [userDetailModalVisible, setUserDetailModalVisible] = React.useState<
		boolean
	>(false);
	function showUserDetailModal() {
		setUserDetailModalVisible(true);
	}
	function closeUserDetailModalVisible() {
		setUserDetailModalVisible(false);
	}
	function callback(key: string) {
		getChannelDetails({ variables: { channelId: channel.id } });
	}
	return (
		<Drawer
			width={640}
			placement="right"
			closable={false}
			onClose={onClose}
			visible={visible}
		>
			<ChannelName>About this Channel</ChannelName>
			<hr />
			<Collapse onChange={callback}>
				<Panel
					header={
						<div>
							<Icon
								type="user"
								style={{ color: "green", paddingRight: "5px" }}
							/>
							{channel.memberCount}
						</div>
					}
					key="1"
				>
					{loading || !data ? (
						<p>Loading</p>
					) : (
						<List
							size="large"
							bordered={true}
							dataSource={data.getChannelDetails!.members}
							renderItem={member => (
								// @ts-ignore
								<List.Item
									className="channelInfoUsername"
									onClick={() => {
										getUserById({
											variables: { userId: member.id }
										});
										showUserDetailModal();
									}}
								>
									{member.username}
								</List.Item>
							)}
						/>
					)}
				</Panel>
			</Collapse>
			<UserDetailModal
				hideDrawer={onClose}
				teamId={teamId}
				teamIdx={teamIdx}
				open={userDetailModalVisible}
				handleCancel={closeUserDetailModalVisible}
				user={
					channelDetail &&
					channelDetail.getUserById &&
					channelDetail.getUserById
				}
			/>
		</Drawer>
	);
};

export default ChannelInfo;
