import { Select } from "antd";
import * as React from "react";
import { useQuery } from "react-apollo";
import {
	GetAllTeamMembersQueryQuery,
	GetAllTeamMembersQueryQueryVariables
} from "src/generated/graphqlTypes";
import { GET_ALL_TEAM_MEMBERS_QUERY } from "src/modules/graphql/team/query/getAllTeamMembers";

interface Props {
	teamId: string;
	handleChange: (values: string[]) => void;
	username: string;
	placeholder: string;
}

const SelectChannelMembers: React.FC<Props> = ({
	teamId,
	handleChange,
	username,
	placeholder
}) => {
	const { data, loading } = useQuery<
		GetAllTeamMembersQueryQuery,
		GetAllTeamMembersQueryQueryVariables
	>(GET_ALL_TEAM_MEMBERS_QUERY, {
		variables: {
			teamId: parseInt(teamId, 10)
		}
	});

	return (
		<Select
			mode="multiple"
			style={{ width: "100%" }}
			placeholder={placeholder}
			defaultValue={[]}
			onChange={handleChange}
		>
			{!loading &&
				data &&
				data.getAllTeamMembers
					.filter(member => member.username !== username)
					.map(member => {
						return (
							<Select.Option key={`${member.id}_${member.email}`}>
								{member.email}
							</Select.Option>
						);
					})}
		</Select>
	);
};

export default SelectChannelMembers;
