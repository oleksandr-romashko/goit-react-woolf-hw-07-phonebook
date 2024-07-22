import { DotWrapper, Dot } from "./Spinner.styled"

const Spinner = () => {
  return (
    <DotWrapper className='spinner'>
      <Dot className="spinner-dot" data-delay="0s" />
      <Dot className="spinner-dot" data-delay=".1s" />
      <Dot className="spinner-dot" data-delay=".2s" />
    </DotWrapper>
  )
}

export default Spinner