import React from "react";
import { Value } from "slate";
import { Editor } from "slate-react";
let history: number[] = [];
function MarkHotkey(options: any) {
	const { type, key } = options;

	return {
		onKeyDown(event: any, editor: any, next: any) {
			if (!event.ctrlKey || event.key !== key) {
				return next();
			}
			event.preventDefault();
			editor.toggleMark(type);
		}
	};
}
function CreateList(options: any) {
	const { type, key } = options;
	console.log(key);

	return {
		onKeyDown(event: React.KeyboardEvent<{}>, editor: any, next: any) {
			history.push(event.keyCode);
			if (
				length < 3 ||
				(history[history.length - 1] === 32 &&
					history[history.length - 2] === 190 &&
					history[history.length - 3] === 49)
			) {
				next();
			}
			if (event.keyCode === 32) {
				if (
					history[history.length - 2] === 190 &&
					history[history.length - 3] === 49
				) {
					event.preventDefault();
					editor.addMark(type);
				}
				history = [];
			}
		}
	};
}

const plugins = [
	MarkHotkey({ key: "b", type: "bold" }),
	MarkHotkey({ key: "`", type: "code" }),
	MarkHotkey({ key: "i", type: "italic" }),
	MarkHotkey({ key: "~", type: "strikethrough" }),
	MarkHotkey({ key: "u", type: "underline" }),
	CreateList({ key: "1. ", type: "order-list" })
];

const initialValue = Value.fromJSON({
	document: {
		nodes: [
			{
				object: "block",
				type: "paragraph",
				nodes: [
					{
						object: "text",
						text: "A line of text in a paragraph."
					}
				]
			}
		]
	}
});

export function SlateEditor() {
	const [editorState, setEditorState] = React.useState(initialValue);
	function renderMark(props: any, editor: any, next: any) {
		switch (props.mark.type) {
			case "bold":
				return <strong>{props.children}</strong>;
			// Add our new mark renderers...
			case "code":
				return <code>{props.children}</code>;
			case "italic":
				return <em>{props.children}</em>;
			case "strikethrough":
				return <del>{props.children}</del>;
			case "underline":
				return <u>{props.children}</u>;
			case "order-list":
				console.log("object");
				return (
					<ul {...props.attribute}>
						<li>{props.children}</li>
					</ul>
				);
			default:
				return next();
		}
	}

	function onChange({ value }: { value: any }) {
		const content = JSON.stringify(value.toJSON());
		localStorage.setItem("content", content);
		setEditorState(value);
	}

	return (
		<div>
			<Editor
				plugins={plugins}
				renderMark={renderMark}
				value={editorState}
				onChange={onChange}
			/>
		</div>
	);
}
