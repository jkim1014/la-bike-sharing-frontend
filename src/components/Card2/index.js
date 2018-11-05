import React, { Component } from 'react'
import { Container, Text } from './styles'

class Card2 extends Component {
  render() {
    const { text } = this.props
    return (
      <Container>
        <Text>1. {text[0].id}</Text>
        <Text>2. {text[1].id}</Text>
        <Text>3. {text[2].id}</Text>
        <Text>Top Three Stations</Text>
      </Container>
    )
  }
}

export default Card2
