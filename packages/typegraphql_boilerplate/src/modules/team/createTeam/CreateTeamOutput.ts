import { createUnionType } from "type-graphql";
import { Team } from "../../../entity/Team";
import ErrorType from "../../../modules/shared/ErrorType";

const CreateTeamOutput = createUnionType({
	name: "CreateTeamOutput", // the name of the GraphQL union
	types: [ErrorType, Team], // function that returns array of object types classes
	resolveType: value => {
		if ("path" in value) {
			return ErrorType; // we can return object type class (the one with `@ObjectType()`)
		}
		if ("id" in value) {
			return Team; // or the schema name of the type as a string
		}
		return undefined;
	}
});

export default CreateTeamOutput;
