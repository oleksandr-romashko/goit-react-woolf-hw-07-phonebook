import { ImportantIcon } from "./ImportantIcon";
import { CrossPlatform } from "./CrossPlatform";
import { IdeaIcon } from "./IdeaIcon";
import { UserProfileIcon } from "./UserProfileIcon";
import { CloseIcon } from "./CloseIcon";


const Icon = props => {
  switch (props.name.toLowerCase()) {
    case 'idea': return <IdeaIcon {...props} />
    case 'important': return <ImportantIcon {...props} />
    case 'cross-platform': return <CrossPlatform {...props} />
    case 'user-profile': return <UserProfileIcon {...props} />
    case 'close': return <CloseIcon {...props} />
    default: return null;
  }
};

export default Icon;