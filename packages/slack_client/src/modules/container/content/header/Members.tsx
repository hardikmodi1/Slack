import { List } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import React from "react";
import {
	Channel,
	GetChannelsDetailsQueryQuery
} from "../../../../generated/graphqlTypes";
interface Props {
	channel: Channel;
	data: GetChannelsDetailsQueryQuery | undefined;
	loading: boolean;
	getUserById: (userId: string) => void;
	Panel: typeof CollapsePanel;
}

const Members: React.FC<Props> = ({ channel, data, loading, getUserById }) => {
	return (
		<>
			{loading || !data ? (
				<p>Loading...</p>
			) : !data.getChannelDetails ? (
				<p>Error</p>
			) : (
				<List
					size="large"
					bordered={true}
					dataSource={data.getChannelDetails.members}
					renderItem={member => (
						// @ts-ignore
						<List.Item
							className="channelInfoUsername"
							onClick={() => {
								getUserById(member.id);
							}}
						>
							{member.username}
						</List.Item>
					)}
				/>
			)}
		</>
	);
};

export default Members;
