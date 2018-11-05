import React, { Component } from 'react'
import { Container, Statistic, Text } from './styles'

class Card extends Component {
  render() {
    const { stat, text } = this.props
    return (
      <Container>
        <Statistic>{stat}</Statistic>
        <Text>{text}</Text>
      </Container>
    )
  }
}

export default Card
