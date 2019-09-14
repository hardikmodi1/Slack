import { Request, Response } from "express";
import createLoaders from "../loaders/createLoaders";

export interface Context {
	req: Request;
	res: Response;
	loaders: ReturnType<typeof createLoaders>;
}
