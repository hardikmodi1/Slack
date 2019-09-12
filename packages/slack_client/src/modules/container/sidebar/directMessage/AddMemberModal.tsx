import { Button, Modal } from "antd";
import { Field, Form, FormikProps, withFormik } from "formik";
import * as React from "react";
import { InputField } from "../../../../modules/shared/InputField";
import { NormalizedErrorMap } from "../../../../modules/shared/normalizedErrorMap";

interface FormValues {
	name: string;
}

interface Props {
	submit: (name: string) => Promise<NormalizedErrorMap | null>;
	loading: boolean;
	open: boolean;
	handleCancel: () => void;
}

const C: React.FC<FormikProps<FormValues> & Props> = ({
	open,
	handleCancel,
	loading
}) => {
	return (
		<Modal
			title="Add Team Member"
			visible={open}
			onCancel={handleCancel}
			okText="Invite People"
			footer={[]}
		>
			<Form>
				<Field
					name="name"
					placeholder="Enter person username/email"
					component={InputField}
				/>
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

const AddMemberModal = withFormik<Props, FormValues>({
	mapPropsToValues: () => ({ name: "" }),
	handleSubmit: async (values, { props, setErrors, resetForm }) => {
		if (!values.name || !values.name.trim()) {
			setErrors({ name: "Enter valid email address!" });
		} else {
			const errors = await props.submit(values.name);
			if (errors) {
				setErrors(errors);
			} else {
				resetForm();
			}
		}
	}
})(C);

export default AddMemberModal;
