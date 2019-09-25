import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { bindings } from "./quillEditor/bindings";

// tslint-disable
interface Props {
	placeholder: string;
	submit: (message: any) => Promise<void>;
}

export const QuillEditor: React.FC<Props> = ({ placeholder, submit }) => {
	const modules = {
		toolbar: false,
		keyboard: { bindings }
	};

	const formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
		"link"
	];

	const quillRef = React.useRef<ReactQuill | null>(null);

	const [text, setText] = React.useState("");

	return (
		<ReactQuill
			placeholder={"Type Message here..."}
			ref={quillRef}
			modules={modules}
			formats={formats}
			value={text}
			onKeyDown={e => {
				if (e.keyCode === 13 && !e.shiftKey) {
					submit(text);
					setText("");
				}
			}}
			onChange={(value: any) => {
				setText(value);
			}}
		/>
	);
};
