import { createUnionType } from "type-graphql";
import { Channel } from "../../../entity/Channel";
import ErrorType from "../../../modules/shared/ErrorType";

const CreateChannelOutput = createUnionType({
	name: "CreateChannelOutput", // the name of the GraphQL union
	types: [ErrorType, Channel], // function that returns array of object types classes
	resolveType: value => {
		if ("path" in value) {
			return ErrorType; // we can return object type class (the one with `@ObjectType()`)
		}
		if ("id" in value) {
			return Channel; // or the schema name of the type as a string
		}
		return undefined;
	}
});

export default CreateChannelOutput;
