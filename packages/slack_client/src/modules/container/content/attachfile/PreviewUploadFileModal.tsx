import { Button, Icon, Modal } from "antd";
import * as React from "react";
import { useMutation } from "react-apollo";
import {
	CreateMessageMutationMutation,
	CreateMessageMutationMutationVariables
} from "src/generated/graphqlTypes";
import { CREATE_MESSAGE_MUTATION } from "src/modules/graphql/message/mutation/createMessageMutation";
import determineFileType from "../shared/determineFileType";
import FileWrapper from "./FileWrapper";
// import { NormalizedErrorMap } from "../../../../modules/shared/normalizedErrorMap";

interface Props {
	// submit: (name: string) => Promise<NormalizedErrorMap | null>;
	// loading: boolean;
	channelId: string;
	open: boolean;
	handleCancel: () => void;
	files: any[];
}

const PreviewUploadFileModal: React.FC<Props> = ({
	open,
	handleCancel,
	files,
	channelId
}) => {
	const [createMessage, { loading }] = useMutation<
		CreateMessageMutationMutation,
		CreateMessageMutationMutationVariables
	>(CREATE_MESSAGE_MUTATION);

	async function uploadFile() {
		await createMessage({
			variables: { channelId, file: files[0] }
		});
		handleCancel();
	}
	return (
		<Modal
			title="Preview File"
			visible={open}
			onCancel={handleCancel}
			okText="Send"
			footer={[]}
		>
			{files.map((file, index) => {
				if (file.type.includes("image")) {
					return (
						<FileWrapper key={index}>
							<img
								src={file.preview}
								alt="upload image"
								width="100%"
							/>
						</FileWrapper>
					);
				}
				return (
					<FileWrapper key={index}>
						<Icon
							style={{ color: "red", marginRight: "5px" }}
							type={`file-${determineFileType(file.name)}`}
						/>
						{file.name}
					</FileWrapper>
				);
			})}
			<Button color="blue" disabled={loading} onClick={uploadFile}>
				Send
			</Button>
		</Modal>
	);
};

export default PreviewUploadFileModal;
