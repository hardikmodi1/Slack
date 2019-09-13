import { DataProxy } from "apollo-cache";
import * as React from "react";
import { useMutation } from "react-apollo";
import {
	CreateChannelMutationMutation,
	CreateChannelMutationMutationVariables
} from "src/generated/graphqlTypes";
import { CREATE_CHANNEL_MUTATION } from "src/modules/graphql/channel/mutation/createChannel";
import { TEAMS_QUERY } from "src/modules/graphql/team/query/allTeamsQuery";
import { normalizeErrors } from "src/modules/shared/normalizeError";
import { NormalizedErrorMap } from "../../../../modules/shared/normalizedErrorMap";
import AddChannelModal from "./AddChannelModal";

interface Props {
	teamId: string;
	teamIdx: number;
	handleCancel: () => void;
	addChannelModalVisible: boolean;
	username: string;
}

const AddChannelModalConnector: React.FC<Props> = ({
	teamId,
	teamIdx,
	addChannelModalVisible,
	handleCancel,
	username
}) => {
	const [createChannel, { loading: createChannelLoading }] = useMutation<
		CreateChannelMutationMutation,
		CreateChannelMutationMutationVariables
	>(CREATE_CHANNEL_MUTATION);

	async function createChannelSubmit(
		name: string,
		isPublic: boolean,
		members: string[]
	): Promise<NormalizedErrorMap | null> {
		const { data: createChannelData } = await createChannel({
			variables: { name, isPublic, teamId, members },
			update(cache: DataProxy, { data: mutationResult }) {
				const cacheData = cache.readQuery({ query: TEAMS_QUERY });
				if (
					mutationResult &&
					(mutationResult as any).createChannel[0].id
				) {
					const channel = (mutationResult! as any).createChannel[0];
					cache.writeQuery({
						query: TEAMS_QUERY,
						data: (cacheData as any).teams[
							teamIdx
						].team.channels.push(channel)
					});
				} else {
					return;
				}
			}
		});
		const createChannelResponse = createChannelData!.createChannel[0];
		if (
			createChannelResponse.__typename === "Error" &&
			createChannelResponse.path
		) {
			return normalizeErrors([createChannelResponse] as any[]);
		}
		handleCancel();
		return null;
	}
	return (
		<AddChannelModal
			username={username}
			teamId={teamId}
			submit={createChannelSubmit}
			loading={createChannelLoading}
			open={addChannelModalVisible}
			handleCancel={handleCancel}
		/>
	);
};

export default AddChannelModalConnector;
