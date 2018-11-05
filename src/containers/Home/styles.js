import styled from 'styled-components'
import { Flex } from 'grid-styled'

export const Wrapper = styled(Flex)`
  align-items: center;
  justify-content: center;
`

export const PreWrapper = styled(Flex)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const Container = styled(Flex)`
  flex-direction: column;
  width: 70%;
  justify-content: center;
`

export const DropRow = styled(Flex)`
  flex-direction: row;
`

export const Row = styled(Flex)`
  flex-direction: row;
  justify-content: space-evenly;
`

export const Row2 = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
`

export const Img = styled.img`
  width: 70px;
  height: 40px;
  margin-top: 30px;
`

export const Title = styled(Flex)`
  text-align: left;
  font-size: 50px;
`

export const SmallTextCont = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const SubTitle = styled(Flex)`
  text-align: left;
  font-size: 35px;
`

export const Graph = styled(Flex)`
  flex-direction: column;
  margin: 5%;
`

export const GraphTitle = styled(Flex)`
  font-size: 40px;
  margin-bottom: 20px;
  text-align: center;
`

export const GraphSub = styled(Flex)`
  font-size: 18px;
  margin-bottom: 20px;
`
