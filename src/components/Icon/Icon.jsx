import PropTypes from 'prop-types';

import { IconIdea } from "./IconIdea";
import { IconImportant } from "./IconImportant";
import { IconCrossPlatform } from "./IconCrossPlatform";
import { IconUser } from "./IconUser";
import { IconCross } from "./IconCross";
import { IconQuestionMark } from "./IconQuestionMark";
import { IconNotepad } from "./IconNotepad";
import { IconCopyPaste } from "./IconCopyPaste";
import { IconPencil } from "./IconPencil";
import { WarningTriangle } from "./IconWarningTriangle";
import { IconCheckMark } from "./IconCheckMark";
import { IconVisibilityShow } from "./IconVisibilityShow";
import { IconVisibilityHide } from "./IconVisibilityHide";

/**
 * Default icon values.
 */
export const ICON_DEFAULTS = Object.freeze({
  WIDTH: '14',
  HEIGHT: '14',
});

/**
 * Object with icon names.
 */
export const ICON_NAME = Object.freeze({
  IDEA: 'idea',
  IMPORTANT: 'important',
  CROSS_PLATFORM: 'cross-platform',
  USER: 'user',
  CROSS: 'cross',
  QUESTION_MARK: 'question-mark',
  NOTEPAD: 'notepad',
  COPY_PASTE: 'copy-paste',
  PENCIL: 'pencil',
  WARNING_TRIANGLE: 'warning-triangle',
  CHECK_MARK: 'check-mark',
  VISIBILITY_SHOW: 'visibility-show',
  VISIBILITY_HIDE: 'visibility-hide',
});

/**
 * Icon component to provide correspond icon based on provided iconName in props.
 * @param {object} props Icon properties.
 * @param {string || ICON_NAME} props.iconName Name of the icon.
 * @returns {JSX.Element} Rendered Icon component.
 */
const Icon = props => {
  switch (props && props.iconName && props.iconName.toLowerCase()) {
    case ICON_NAME.IDEA: return <IconIdea {...props} />
    case ICON_NAME.IMPORTANT: return <IconImportant {...props} />
    case ICON_NAME.CROSS_PLATFORM: return <IconCrossPlatform {...props} />
    case ICON_NAME.USER: return <IconUser {...props} />
    case ICON_NAME.CROSS: return <IconCross {...props} />
    case ICON_NAME.QUESTION_MARK: return <IconQuestionMark {...props} />
    case ICON_NAME.NOTEPAD: return <IconNotepad {...props} />
    case ICON_NAME.COPY_PASTE: return <IconCopyPaste {...props} />
    case ICON_NAME.PENCIL: return <IconPencil {...props} />
    case ICON_NAME.WARNING_TRIANGLE: return <WarningTriangle {...props} />
    case ICON_NAME.CHECK_MARK: return <IconCheckMark {...props} />
    case ICON_NAME.VISIBILITY_SHOW: return <IconVisibilityShow {...props} />
    case ICON_NAME.VISIBILITY_HIDE: return <IconVisibilityHide {...props} />
    default: return <IconQuestionMark {...props} />;
  }
};

Icon.propTypes = {
  iconName: PropTypes.oneOf(Object.values(ICON_NAME)),
};

export default Icon;