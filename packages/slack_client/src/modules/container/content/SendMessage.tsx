import { Icon } from "antd";
import * as React from "react";
import { QuillEditor } from "../../shared/QuillEditor";
import AttachFile from "./AttachFile";
import SendMessageWrapper from "./styled-components/SendMessageWrapper";

// interface FormValues {
// 	message: string;
// }

interface Props {
	submit: (text: string) => Promise<void>;
	channelId: string;
}

// const C: React.FC<FormikProps<FormValues> & Props> = ({
// 	channelName,
// 	channelId
// }) => {
// 	return (
// 		<SendMessageWrapper>
// 			<Form>
// 				<div>
// 					<Field
// 						name="message"
// 						placeholder={`Message # ${channelName}`}
// 						component={QuillEditor}
// 						prefix={
// 							(
// 								<AttachFile channelId={channelId}>
// 									<Icon
// 										type="file-add"
// 										style={{
// 											color: "rgba(0,0,0,.25)"
// 										}}
// 									/>
// 								</AttachFile>
// 							) as any
// 						}
// 					/>
// 				</div>
// 			</Form>
// 		</SendMessageWrapper>
// 	);
// };

// const SendMessage = withFormik<Props, FormValues>({
// 	mapPropsToValues: () => ({ message: "" }),
// 	handleSubmit: async (values, { props, setErrors, resetForm }) => {
// 		console.log(values.message)
// 		// await props.submit(values.message);
// 		resetForm();
// 		// if (errors) {
// 		// setErrors(errors);
// 		// } else {
// 		// props.onFinish();
// 	}
// })(C);

// export default SendMessage;

const SendMessage: React.FC<Props> = ({ channelId, submit }) => {
	return (
		<SendMessageWrapper>
			<div>
				<QuillEditor
					placeholder="Type message here..."
					submit={async (message: any) => {
						await submit(message);
					}}
				/>
				<AttachFile channelId={channelId}>
					<Icon
						type="file-add"
						style={{
							color: "rgba(0,0,0,.25)"
						}}
					/>
				</AttachFile>
			</div>
		</SendMessageWrapper>
	);
};

export default SendMessage;
