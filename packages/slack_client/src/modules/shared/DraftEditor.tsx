import { convertFromRaw, convertToRaw, Editor, EditorState, getDefaultKeyBinding, Modifier, RichUtils, SelectionState } from "draft-js";
import * as React from "react";
import "react-quill/dist/quill.snow.css";

// tslint-disable
interface Props {
	placeholder: string;
	submit: (message: any) => Promise<void>;
}

export const QuillEditor: React.FC<Props> = ({ placeholder, submit }) => {
	React.useEffect(() => {
		const content = window.localStorage.getItem("content");
		if (content) {
			setEditorState(
				EditorState.createWithContent(
					convertFromRaw(JSON.parse(content))
				)
			);
		}
	}, []);
	const [history, setHistory] = React.useState<number[]>([]);
	const [editorState, setEditorState] = React.useState(
		EditorState.createEmpty()
	);

	function handleKeyCommand(command: string, newEditorState: EditorState) {
		if (command === "ordered-list-item") {
			const selection = newEditorState.getSelection();
			const block = newEditorState
				.getCurrentContent()
				.getBlockForKey(selection.getAnchorKey());
			if (block.getType() === "unstyled" && block.getDepth() === 0) {
				let listState = RichUtils.toggleBlockType(
					newEditorState,
					command
				);
				const contentWithoutDash = Modifier.replaceText(
					listState.getCurrentContent(),
					new SelectionState({
						anchorKey: block.getKey(),
						anchorOffset: 0,
						focusKey: block.getKey(),
						focusOffset: block.getLength()
					}),
					""
				);
				listState = EditorState.push(
					listState,
					contentWithoutDash,
					"change-block-type"
				);
				const selectionState = listState.getSelection();
				listState = EditorState.forceSelection(
					listState,
					selectionState
				);
				setEditorState(listState);
				console.log(selectionState);
				return "handled";
			}
		}
		const newState = RichUtils.handleKeyCommand(newEditorState, command);
		if (newState) {
			setEditorState(newState);
			return "handled";
		}
		return "not-handled";
	}

	function myKeyBindingFn(e: React.KeyboardEvent<{}>): string | null {
		setHistory([...history, e.keyCode]);
		if (history.length > 50) {
			setHistory([]);
		}
		if (e.keyCode === 32) {
			if (
				history[history.length - 1] === 190 &&
				history[history.length - 2] === 49
			) {
				return "ordered-list-item";
			}
		}
		if (e.keyCode === 9) {
			e.preventDefault();
			const selection = editorState.getSelection();
			const block = editorState
				.getCurrentContent()
				.getBlockForKey(selection.getAnchorKey());

			if (block.getType() === "ordered-list-item") {
				decreaseBlockDepth(block);
			}
		}
		return getDefaultKeyBinding(e);
	}

	function decreaseBlockDepth(block: any) {
		const blockKey = block.getKey();
		const depth = block.getDepth();
		const newBlock = block.set("depth", depth + 1);
		console.log(newBlock);

		const contentState = editorState.getCurrentContent();
		const blockMap = contentState.getBlockMap();
		const newBlockMap = blockMap.set(blockKey, newBlock);
		setEditorState(
			EditorState.push(
				editorState,
				// @ts-ignore
				contentState.merge({ blockMap: newBlockMap }),
				"adjust-depth"
			)
		);
	}

	return (
		<Editor
			editorState={editorState}
			keyBindingFn={myKeyBindingFn}
			onChange={state => {
				window.localStorage.setItem(
					"content",
					JSON.stringify(convertToRaw(state.getCurrentContent()))
				);
				setEditorState(state);
			}}
			handleKeyCommand={handleKeyCommand}
		/>
	);
};

