import { Button, Checkbox, Modal } from "antd";
import { Field, Form, FormikProps, withFormik } from "formik";
import * as React from "react";
import { NormalizedErrorMap } from "src/modules/shared/normalizedErrorMap";
import { InputField } from "../../../../modules/shared/InputField";
import SelectChannelMembers from "./SelectChannelMembers";

interface FormValues {
	name: string;
	isPublic: boolean;
	members: string[];
}

interface Props {
	submit: (
		name: string,
		isPublic: boolean,
		members: string[]
	) => Promise<NormalizedErrorMap | null>;
	loading: boolean;
	open: boolean;
	handleCancel: () => void;
	teamId: string;
	username: string;
}

const C: React.FC<FormikProps<FormValues> & Props> = ({
	open,
	handleCancel,
	resetForm,
	loading,
	values,
	setFieldValue,
	teamId,
	username
}) => {
	return (
		<Modal
			title="Add Channel"
			visible={open}
			onCancel={() => {
				resetForm();
				handleCancel();
			}}
			okText="Create Channel"
			footer={[]}
		>
			<Form>
				<Field
					name="name"
					placeholder="Enter channel name"
					component={InputField}
				/>
				<div>
					<Checkbox
						name="isPublic"
						checked={values.isPublic}
						onChange={e =>
							setFieldValue("isPublic", !values.isPublic)
						}
					>
						Public
					</Checkbox>
				</div>
				{!values.isPublic && (
					<div style={{ marginTop: "10px", marginBottom: "10px" }}>
						<SelectChannelMembers
							placeholder="Select Members to add"
							username={username}
							teamId={teamId}
							handleChange={members => {
								setFieldValue("members", members);
							}}
						/>
					</div>
				)}
				<Button
					key="submit"
					htmlType="submit"
					type="primary"
					disabled={loading}
				>
					Submit
				</Button>
			</Form>
		</Modal>
	);
};

const AddChannelModal = withFormik<Props, FormValues>({
	mapPropsToValues: () => ({ name: "", isPublic: true, members: [] }),
	handleSubmit: async (values, { props, setErrors, resetForm }) => {
		if (!values.name || !values.name.trim()) {
			setErrors({ name: "Channel name should not be empty" });
		} else {
			const errors = await props.submit(
				values.name,
				values.isPublic,
				values.members.map(member => {
					const emailStartIndex = member.indexOf("_");
					return member.substring(0, emailStartIndex);
				})
			);
			if (errors) {
				setErrors(errors);
			} else {
				resetForm();
			}
		}
	}
})(C);

export default AddChannelModal;
