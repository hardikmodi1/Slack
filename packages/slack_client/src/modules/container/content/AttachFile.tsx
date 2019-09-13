import * as React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import PreviewUploadFileModal from "./attachfile/PreviewUploadFileModal";

interface Props {
	disableClick?: boolean;
	channelId: string;
	style?: object;
}

const Div = styled.div`
	transition: 0.2s linear;
	// &:hover {
	// 	background-color: green;
	// 	transition: 0.2s linear;
	// 	cursor: pointer;
	// }
`;

const AttachFile: React.FC<Props> = ({
	children,
	disableClick = false,
	channelId,
	style = {}
}) => {
	const [
		PreviewUploadFileModalVisible,
		setPreviewUploadFileModalVisible
	] = React.useState(false);
	function handleCancel() {
		setPreviewUploadFileModalVisible(false);
	}

	const [files, setFiles] = React.useState<any[]>([]);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		noClick: disableClick,
		onDrop: acceptedFiles => {
			setFiles(
				acceptedFiles.map(file =>
					Object.assign(file, {
						preview: URL.createObjectURL(file)
					})
				)
			);
			setPreviewUploadFileModalVisible(true);
		}
	});

	React.useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach(file => URL.revokeObjectURL(file.preview));
		},
		[files]
	);
	return (
		<Div style={style}>
			<div {...getRootProps({ className: "dropzone" })}>
				<input {...getInputProps()} />
				{isDragActive && "Drop file here"}
				{children}
			</div>
			{files.length !== 0 && (
				<PreviewUploadFileModal
					channelId={channelId}
					open={PreviewUploadFileModalVisible}
					handleCancel={handleCancel}
					files={files}
				/>
			)}
		</Div>
	);
};

export default AttachFile;
