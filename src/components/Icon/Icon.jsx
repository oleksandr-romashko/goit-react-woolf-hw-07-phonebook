import { ImportantIcon } from "./ImportantIcon";
import { IdeaIcon } from "./IdeaIcon";
import { UserProfileIcon } from "./UserProfileIcon";


const Icon = props => {
  switch (props.name.toLowerCase()) {
    case 'idea': return <IdeaIcon {...props} />
    case 'important': return <ImportantIcon {...props} />
    case 'user-profile': return <UserProfileIcon {...props} />
    default: return null;
  }
};

export default Icon;