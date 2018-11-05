import styled from 'styled-components'
import { Flex } from 'grid-styled'

export const Wrapper = styled(Flex)`
  align-items: center;
  justify-content: center;
`

export const Container = styled(Flex)`
  flex-direction: column;
  width: 70%;
  justify-content: center;
`

export const Row = styled(Flex)`
  flex-direction: row;
  justify-content: space-evenly;
`

export const Title = styled(Flex)`
  text-align: left;
  font-size: 50px;
`

export const SubTitle = styled(Flex)`
  text-align: left;
  font-size: 35px;
  font-weight: bold;
`

export const Graph = styled(Flex)`
  flex-direction: column;
  margin: 5%;
`

export const GraphTitle = styled(Flex)`
  font-size: 40px;
  margin-bottom: 20px;
`

export const GraphSub = styled(Flex)`
  font-size: 18px;
  margin-bottom: 20px;
`
