import { ImportantIcon } from "./ImportantIcon";
import { CrossPlatform } from "./CrossPlatform";
import { IdeaIcon } from "./IdeaIcon";


const Icon = props => {
  switch (props.name.toLowerCase()) {
    case 'idea': return <IdeaIcon {...props} />
    case 'important': return <ImportantIcon {...props} />
    default: return null;
  }
};

export default Icon;