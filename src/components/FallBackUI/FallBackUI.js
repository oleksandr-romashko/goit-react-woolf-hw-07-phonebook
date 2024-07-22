import Icon, { ICON_NAME } from 'components/Icon/Icon';
import { Cause, FallbackWrapper, Tips } from './FallBackUI.styled';

/**
 * Fallback message in ase of app error.
 * @param {Error} props.error Thrown error.
 * @returns {JSX.Element} Rendered fallback component.
 */
const FallBackUI = ({ error }) => (
  <FallbackWrapper>
    <Icon iconName={ICON_NAME.NOTEPAD} className="notepad-icon" />
    <h1>
      Aaaah! Sorry, but something went wrong <span className="no-wrap">:(</span>
    </h1>
    <Tips>
      <p>From now on, you may have to use pen and paper.</p>
      <p>But don't worry, you may also refresh the page or try again later.</p>
      <p>
        If the problem continues, please{' '}
        <a
          href="https://github.com/oleksandr-romashko"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="contact support"
        >
          contact me
        </a>
        .
      </p>
    </Tips>
    {error && (
      <Cause>
        <summary>Details</summary>
        <code>{error.stack}</code>
      </Cause>
    )}
  </FallbackWrapper>
);

export default FallBackUI;
