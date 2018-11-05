import styled from 'styled-components'
import { Flex } from 'grid-styled'

export const Container = styled(Flex)`
  width: 170px;
  height: 170px;
  padding: 5px;
  border-radius: 20px;
  border: 5px solid #f70;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  margin-top: 50px;
`

export const Text = styled(Flex)`
  font-size: 18px;
  text-align: center;
  flex-wrap: wrap;
`
