import { Input, List, Modal } from "antd";
import Downshift from "downshift";
import * as React from "react";
import { useQuery } from "react-apollo";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import {
	GetAllTeamMembersQueryQuery,
	GetAllTeamMembersQueryQueryVariables
} from "src/generated/graphqlTypes";
import { GET_ALL_TEAM_MEMBERS_QUERY } from "src/modules/graphql/team/query/getAllTeamMembers";

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
			teamId: parseInt(teamId, 10)
		}
	});
	// const client = useApolloClient();
	return (
		<Modal
			title="Direct Message"
			visible={open}
			onCancel={handleCancel}
			okText="Create Channel"
			footer={[]}
		>
			<Downshift
				onChange={selectedUser => {
					if (!selectedUser) {
						return;
					}
					history.push(
						`/view-team/user/${teamId}/${selectedUser.id}`
					);
					handleCancel();
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
