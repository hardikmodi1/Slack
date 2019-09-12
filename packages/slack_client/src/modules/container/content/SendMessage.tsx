import { Icon } from "antd";
import { Field, Form, FormikProps, withFormik } from "formik";
import * as React from "react";
import { InputField } from "../../shared/InputField";
import AttachFile from "./AttachFile";
import SendMessageWrapper from "./styled-components/SendMessageWrapper";

interface FormValues {
	message: string;
}

interface Props {
	submit: (text: string) => Promise<void>;
	channelName: string;
	channelId: number;
}

const C: React.FC<FormikProps<FormValues> & Props> = ({
	channelName,
	channelId
}) => {
	return (
		<SendMessageWrapper>
			<Form>
				<div>
					<Field
						name="message"
						placeholder={`Message # ${channelName}`}
						component={InputField}
						prefix={
							(
								<AttachFile channelId={channelId}>
									<Icon
										type="file-add"
										style={{
											color: "rgba(0,0,0,.25)"
										}}
									/>
								</AttachFile>
							) as any
						}
					/>
				</div>
			</Form>
		</SendMessageWrapper>
	);
};

const SendMessage = withFormik<Props, FormValues>({
	mapPropsToValues: () => ({ message: "" }),
	handleSubmit: async (values, { props, setErrors, resetForm }) => {
		await props.submit(values.message);
		resetForm();
		// if (errors) {
		// setErrors(errors);
		// } else {
		// props.onFinish();
	}
})(C);

export default SendMessage;
