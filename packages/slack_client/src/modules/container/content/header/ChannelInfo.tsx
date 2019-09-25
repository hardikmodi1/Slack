import { Collapse, Comment, Drawer, Icon, List } from "antd";
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
import DisplayMessae from "../messageContainer/DisplayMessage";
import determineFileType from "../shared/determineFileType";
import Members from "./Members";
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

	function runGetUserById(userId: string) {
		getUserById({
			variables: { userId }
		});
		showUserDetailModal();
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
				{!channel.dmChannel && !channel.public && (
					<Panel
						header={
							<div>
								<Icon
									type="user"
									style={{
										color: "green",
										paddingRight: "5px"
									}}
								/>
								{channel.memberCount} Members
							</div>
						}
						key="1"
					>
						<Members
							channel={channel}
							data={data}
							loading={loading}
							getUserById={runGetUserById}
							Panel={Panel}
						/>
					</Panel>
				)}

				<Panel
					header={
						<div>
							<Icon
								type="pushpin"
								style={{ color: "red", paddingRight: "5px" }}
							/>
							{channel.pinnedMessagesCount} Pinned Messages
						</div>
					}
					key="2"
				>
					{loading || !data || !data.getChannelDetails ? (
						<p>Loading</p>
					) : (
						<List
							size="large"
							bordered={true}
							dataSource={data.getChannelDetails.pinnedMessages}
							renderItem={message => (
								<List.Item className="channelInfoUsername">
									<Comment
										author={message.user!.username}
										content={
											<DisplayMessae
												message={message.pinnedMessage}
											/>
										}
										datetime={`pinned by ${
											message.user!.username
										}`}
									/>
								</List.Item>
							)}
						/>
					)}
				</Panel>
				<Panel
					header={
						<div>
							<Icon
								type="file"
								style={{ color: "orange", paddingRight: "5px" }}
							/>
							files
						</div>
					}
					key="3"
				>
					{loading || !data || !data.getChannelDetails ? (
						<p>Loading</p>
					) : (
						<List
							size="large"
							bordered={true}
							dataSource={data.getChannelDetails.files}
							renderItem={message => (
								<List.Item className="channelInfoUsername">
									<a
										href={message.url as string}
										download={message.url}
									>
										<Icon
											style={{
												color: "red",
												marginRight: "5px"
											}}
											type={`file-${determineFileType(
												message.originalName as string
											)}`}
										/>
										{message.originalName!.length > 15
											? message.originalName!.substring(
													0,
													15
											  ) + "..."
											: message.originalName}
									</a>
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
