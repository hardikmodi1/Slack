import { Stream } from "stream";

export interface UploadFileTpye {
	filename: string;
	mimetype: string;
	encoding: string;
	createReadStream: () => Stream;
}
