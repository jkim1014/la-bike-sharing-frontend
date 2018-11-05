import styled from 'styled-components'
import { Flex } from 'grid-styled'

export const Container = styled(Flex)`
  flex-direction: column;
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
  font-size: 25px;
`

export const Graph = styled(Flex)`
  flex-direction: column;
  margin: 10%;
`

export const GraphTitle = styled(Flex)`
  font-size: 40px;
`
