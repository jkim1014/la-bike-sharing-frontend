import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Helmet from 'react-helmet'
import { Container, Title, SubTitle, Graph, GraphTitle, Row } from './styles'
import {
  Jumbotron,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  ButtonGroup
} from 'reactstrap'
import {
  GET_TEN_START,
  GET_TEN_STOP,
  GET_AVG_DUR,
  GET_AVG_DIST,
  GET_REG,
  GET_BREAK_DOWN,
  GET_SEASON
} from './graphql'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdownOpen1: false,
      dropdownOpen2: false,
      dropdownOpen3: false,
      season: 'Summer',
      planDuration: '30'
    }
  }

  toggleSeason = () => {
    this.setState({ dropdownOpen1: !this.state.dropdownOpen1 })
  }

  togglePlan = () => {
    this.setState({ dropdownOpen2: !this.state.dropdownOpen2 })
  }

  toggleTrip = () => {
    this.setState({ dropdownOpen3: !this.state.dropdownOpen3 })
  }

  selectSeason = event => {
    this.setState({
      dropdownOpen1: !this.state.dropdownOpen1,
      season: event.target.innerText
    })
  }

  selectPlan = event => {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2,
      planDuration: event.target.innerText
    })
  }

  selectTrip = event => {
    this.setState({
      dropdownOpen3: !this.state.dropdownOpen3,
      tripType: event.target.innerText
    })
  }

  selectButton0 = event => {
    this.setState({ tripAvg: event.target.innerText })
  }
  selectButton1 = event => {
    this.setState({ planType: event.target.innerText })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <Helmet>
          <title>LA Bike Sharing</title>
          <meta name="description" content="LA Bike Sharing Data Analytics" />
        </Helmet>
        <Container>
          <Title>LA Bike Sharing Analytics</Title>
          <SubTitle>by Joon Kim</SubTitle>

          <Jumbotron>
            <GraphTitle>Seasonal Variance</GraphTitle>
            <Dropdown
              isOpen={this.state.dropdownOpen1}
              toggle={this.toggleSeason}
            >
              <DropdownToggle caret>{this.state.season}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.selectSeason}>Summer</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.selectSeason}>Fall</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.selectSeason}>Winter</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.selectSeason}>Spring</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <hr />
            <Query
              query={GET_SEASON}
              fetchPolicy="cache-and-network"
              variables={{ input: this.state.season }}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading</p>
                if (error) return <p>{error}</p>
                console.log(data)
                return <div>{data.seasonal.mostUsedPlan}</div>
              }}
            </Query>
          </Jumbotron>

          <Jumbotron>
            <GraphTitle>Riders Breakdown</GraphTitle>
            <Row>
              <Dropdown
                isOpen={this.state.dropdownOpen2}
                toggle={this.togglePlan}
              >
                <DropdownToggle caret>{this.state.planDuration}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.selectPlan}>0</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.selectPlan}>30</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.selectPlan}>365</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown
                isOpen={this.state.dropdownOpen3}
                toggle={this.toggleTrip}
              >
                <DropdownToggle caret>{this.state.tripType}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.selectTrip}>One Way</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.selectTrip}>
                    Round Trip
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Row>
            <hr />
            <Query
              query={GET_BREAK_DOWN}
              fetchPolicy="cache-and-network"
              variables={{
                input: {
                  planDuration: this.state.planDuration,
                  tripType: this.state.tripType
                }
              }}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading</p>
                if (error) return <p>{error}</p>
                console.log(data)
                return <div>{data.breakDown.percentage}%</div>
              }}
            </Query>
          </Jumbotron>
          <Jumbotron>
            <GraphTitle>Change of Bike Over Day</GraphTitle>
            <hr />
          </Jumbotron>
          <Graph>
            <GraphTitle>Most Popular Start/Stop Station</GraphTitle>
            <Query query={GET_TEN_START} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
                if (loading) return <p>Loading</p>
                if (error) return <p>{error}</p>
                console.log(data)
                return data.topTenStartStations.map(station => (
                  <div>{station.id} | </div>
                ))
              }}
            </Query>
            <Query query={GET_TEN_STOP} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
                if (loading) return <p>Loading</p>
                if (error) return <p>{error}</p>
                console.log(data)
                return data.topTenStopStations.map(station => (
                  <div>{station.id} | </div>
                ))
              }}
            </Query>
          </Graph>
          <Graph>
            <GraphTitle>
              Average Distance Travelled / Average Trip Duration
            </GraphTitle>
            <ButtonGroup>
              <Button key="1" onClick={this.selectButton0}>
                One Way
              </Button>
              <Button key="2" onClick={this.selectButton0}>
                Round Trip
              </Button>
            </ButtonGroup>
            <Query
              query={GET_AVG_DIST}
              fetchPolicy="cache-and-network"
              variables={{ input: this.state.tripAvg }}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading</p>
                if (error) return <p>{error}</p>
                console.log(data)
                return <div>{data.averageDistanceTravelled}</div>
              }}
            </Query>
            <ButtonGroup>
              <Button key="1" onClick={this.selectButton1}>
                0
              </Button>
              <Button key="2" onClick={this.selectButton1}>
                30
              </Button>
              <Button key="3" onClick={this.selectButton1}>
                365
              </Button>
            </ButtonGroup>
            <Query
              query={GET_AVG_DUR}
              fetchPolicy="cache-and-network"
              variables={{ input: this.state.planType }}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading</p>
                if (error) return <p>{error}</p>
                console.log(data)
                return <div>{data.averageTripDuration}</div>
              }}
            </Query>
          </Graph>
          <Graph>
            <GraphTitle>Regular Commute</GraphTitle>
            <Query query={GET_REG} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
                if (loading) return <p>Loading</p>
                if (error) return <p>{error}</p>
                console.log(data)
                return <div>{data.regular}%</div>
              }}
            </Query>
          </Graph>
          <Graph>
            <GraphTitle>Top 5 Route</GraphTitle>
          </Graph>
          <Graph>
            <GraphTitle>Rentals Per Day</GraphTitle>
          </Graph>
          <Graph>
            <GraphTitle>Peak Rental Hours</GraphTitle>
          </Graph>
        </Container>
      </div>
    )
  }
}

export default Home
