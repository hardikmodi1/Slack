import { Icon } from "antd";
import * as React from "react";
import FileWrapper from "../attachfile/FileWrapper";
import determineFileType from "../shared/determineFileType";

interface Props {
	message: any;
}

const DisplayMessae: React.FC<Props> = ({
	message: { text, type, url, originalName }
}) => {
	if (!type) {
		return <p>{text}</p>;
	}
	if (type.startsWith("image/")) {
		return <img width="50%" src={url} alt={originalName} />;
  }
  if(type.startsWith('audio')){
    return (
      <div>
        <audio controls={true}>
          <source src={url} type={type} />
        </audio>
      </div>
    )
  }
	return (
		<FileWrapper style={{ width: "25%" }}>
			<a href={url} download={url}>
				<Icon
					style={{ color: "red", marginRight: "5px" }}
					type={`file-${determineFileType(originalName)}`}
				/>
				{originalName.length > 15
					? originalName.substring(0, 15) + "..."
					: originalName}
			</a>
		</FileWrapper>
	);
};

export default DisplayMessae;
