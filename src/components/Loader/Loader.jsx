import { LoaderWrapper, DotWrapper, Dot } from "./Loader.style";

/**
 * Loader component.
 * @returns {JSX.Element} Rendered loader component.
 */
const Loader = () => {
  return (
    <LoaderWrapper>
      Loading
      <DotWrapper>
        <Dot data-delay="0s" />
        <Dot data-delay=".1s" />
        <Dot data-delay=".2s" />
      </DotWrapper>
    </LoaderWrapper>
  )
}

export default Loader;