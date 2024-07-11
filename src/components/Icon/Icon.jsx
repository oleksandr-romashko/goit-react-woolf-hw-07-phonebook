import { ImportantIcon } from "./ImportantIcon";
import { CrossPlatform } from "./CrossPlatform";
import { IdeaIcon } from "./IdeaIcon";
import { UserProfileIcon } from "./UserProfileIcon";


const Icon = props => {
  switch (props.name.toLowerCase()) {
    case 'idea': return <IdeaIcon {...props} />
    case 'important': return <ImportantIcon {...props} />
    case 'cross-platform': return <CrossPlatform {...props} />
    case 'user-profile': return <UserProfileIcon {...props} />
    default: return null;
  }
};

export default Icon;