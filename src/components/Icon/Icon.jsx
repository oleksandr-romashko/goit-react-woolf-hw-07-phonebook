import { ImportantIcon } from "./ImportantIcon";
import { CrossPlatform } from "./CrossPlatform";
import { IdeaIcon } from "./IdeaIcon";
import { UserProfileIcon } from "./UserProfileIcon";
import { CloseIcon } from "./CloseIcon";
import { QuestionMarkIcon } from "./QuestionMarkIcon";

export const ICON_DEFAULT = Object.freeze({
  WIDTH: '14',
  HEIGHT: '14',
});

const Icon = props => {
  switch (props && props.name && props.name.toLowerCase()) {
    case 'idea': return <IdeaIcon {...props} />
    case 'important': return <ImportantIcon {...props} />
    case 'cross-platform': return <CrossPlatform {...props} />
    case 'user-profile': return <UserProfileIcon {...props} />
    case 'cross': return <CloseIcon {...props} />
    case 'question-mark': return <QuestionMarkIcon {...props} />
    default: return <QuestionMarkIcon {...props} />;
  }
};

export default Icon;