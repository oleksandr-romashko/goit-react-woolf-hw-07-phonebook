import Spinner from "./Spinner";
import { LoaderWrapper } from "./Loader.styled";

/**
 * Loader component.
 * @returns {JSX.Element} Rendered loader component.
 */
const Loader = () => {
  return (
    <LoaderWrapper>
      Loading
      <Spinner />
    </LoaderWrapper>
  )
}

export default Loader;