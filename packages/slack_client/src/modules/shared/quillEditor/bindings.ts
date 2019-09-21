export const bindings = {
	smartbreak: {
		key: 13,
		shiftKey: true,
		handler: function(range: any, context: any) {
			// @ts-ignore
			this.quill.setSelection(range.index, "silent");
			// @ts-ignore
			this.quill.insertText(range.index, "\n", "user");
			// @ts-ignore
			this.quill.setSelection(range.index + 1, "silent");
			// @ts-ignore
			this.quill.format("linebreak", true, "user");
		}
	},
	enter: {
		key: 13,
		handler: (range: any, context: any) => {
			console.log("object");
		}
	},
	tab: {
		key: 9,
		offset: 0,
		handler: function(range: any, context: any) {
			// @ts-ignore
			this.quill.format("indent", "+1", "user");
		}
	},
	threeDashesDivider: {
		key: 189,
		offset: 2,
		handler: function(range: any, context: any) {
			if (context.prefix !== "--") {
				return true;
			}
			// @ts-ignore
			this.quill.insertText(range.index, "\n", "user");
			// @ts-ignore
			this.quill.insertEmbed(range.index + 1, "divider", true, "user");
			// @ts-ignore
			this.quill.setSelection(range.index + 2, "silent");
			// @ts-ignore
			this.quill.deleteText(range.index - 2, 2);
			return true;
		}
	},
	spaceToLink: {
		collapsed: true,
		key: " ",
		prefix: /https?:\/\/[^\s]+/,
		handler: (() => {
			let prevOffset = 0;
			return function(range: any, context: any) {
				let url;
				const regex = /https?:\/\/[^\s]+/g;
				// @ts-ignore
				const text = this.quill.getText(prevOffset, range.index);
				const match = text.match(regex);

				if (match === null) {
					prevOffset = range.index;
					return true;
				}
				if (match.length > 1) {
					console.log(match);
					url = match[match.length - 1];
				} else {
					url = match[0];
				}
				const ops = [];
				// only retain if non-zero. link is in the beginning
				if (range.index - url.length) {
					ops.push({ retain: range.index - url.length });
				}
				ops.push({ delete: url.length });
				ops.push({ insert: url, attributes: { link: url } });
				// @ts-ignore
				this.quill.updateContents({ ops });
				prevOffset = range.index;
				return true;
			};
		})()
	}
};