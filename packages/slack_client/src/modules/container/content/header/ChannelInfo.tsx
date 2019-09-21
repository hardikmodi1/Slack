import { Collapse, Drawer, Icon, List } from "antd";
import React from "react";
import { useLazyQuery } from "react-apollo";
import { GET_CHANNEL_DETAILS_QUERY } from "src/modules/graphql/channel/query/getChannelDetailsQuery";
import {
	Channel,
	GetChannelsDetailsQueryQuery,
	GetChannelsDetailsQueryQueryVariables
} from "../../../../generated/graphqlTypes";
import { ChannelName } from "./styled-components";
const { Panel } = Collapse;

interface Props {
	channel: Channel;
	visible: boolean;
	onClose: () => void;
}

const ChannelInfo: React.FC<Props> = ({ visible, onClose, channel }) => {
	const [getChannelDetails, { loading, data }] = useLazyQuery<
		GetChannelsDetailsQueryQuery,
		GetChannelsDetailsQueryQueryVariables
	>(GET_CHANNEL_DETAILS_QUERY);
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
								<List.Item className="channelInfoUsername">
									{member.username}
								</List.Item>
							)}
						/>
					)}
				</Panel>
			</Collapse>
		</Drawer>
	);
};

export default ChannelInfo;
