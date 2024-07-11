import { DotWrapper, Dot } from "./Spinner.styled"

const Spinner = () => {
  return (
    <DotWrapper className='spinner'>
      <Dot data-delay="0s" />
      <Dot data-delay=".1s" />
      <Dot data-delay=".2s" />
    </DotWrapper>
  )
}

export default Spinner