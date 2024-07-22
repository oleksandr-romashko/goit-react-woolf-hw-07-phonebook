import Spinner from "./Spinner";
import { LoaderWrapper } from "./Loader.styled";

/**
 * Loader component to show loading in progress status.
 * @returns {JSX.Element} Rendered loader component.
 */
const Loader = ({text}) => {
  return (
    <LoaderWrapper>
      {text || 'Loading'}
      <Spinner />
    </LoaderWrapper>
  )
}

export default Loader;