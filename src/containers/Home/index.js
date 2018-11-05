import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Helmet from 'react-helmet'
import Plot from 'react-plotly.js'
import Card from '../../components/Card'
import Card2 from '../../components/Card2'
import Footer from '../../components/Footer'
import bike from './bike.png'
import {
  Container,
  PreWrapper,
  Title,
  SubTitle,
  Graph,
  GraphTitle,
  GraphSub,
  Row,
  Row2,
  DropRow,
  Wrapper,
  SmallTextCont,
  Img
} from './styles'
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
  GET_TOP_ROUTES,
  GET_AVG_DUR,
  GET_AVG_DIST,
  GET_REG,
  GET_BREAK_DOWN,
  GET_SEASON,
  GET_PEAK_HOURS
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
    return (
      <div>
        <Helmet>
          <title>LA Bike Sharing</title>
          <meta name="description" content="LA Bike Sharing Data Analytics" />
        </Helmet>
        <Wrapper>
          <PreWrapper>
            <Container>
              <Row2>
                <Title>LA Bike Sharing Analytics</Title>
                <Img src={bike} />
              </Row2>

              <SubTitle>Joon Kim</SubTitle>
              <GraphSub>
                I separated out the project into two repositories. One for the
                frontend of the project and another for the backend. Here is a
                list of technologies I used.
              </GraphSub>
              <GraphSub>
                Frontend-stack: React, Apollo-Client, Bootstrap, Plot.ly React
                library for graphs
              </GraphSub>
              <GraphSub>Backend-stack: Node.js, GraphQL, SQL</GraphSub>
              <Jumbotron>
                <GraphTitle>Seasonal Variance</GraphTitle>
                <GraphSub>
                  Information about the bike sharing audience between different
                  seasons
                </GraphSub>
                <Dropdown
                  isOpen={this.state.dropdownOpen1}
                  toggle={this.toggleSeason}
                >
                  <DropdownToggle caret color="primary">
                    {this.state.season}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.selectSeason}>
                      Summer
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.selectSeason}>
                      Fall
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.selectSeason}>
                      Winter
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.selectSeason}>
                      Spring
                    </DropdownItem>
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
                    return (
                      <Row>
                        <Card
                          stat={data.seasonal.mostUsedPlan}
                          text="Most Used Plan (days plan)"
                        />
                        <Card
                          stat={data.seasonal.averageTripDuration.toFixed(2)}
                          text="Average Trip Duration (miles)"
                        />
                        <Card2 text={data.seasonal.topThreeStations} />
                      </Row>
                    )
                  }}
                </Query>
              </Jumbotron>

              <Jumbotron>
                <GraphTitle>Riders Breakdown</GraphTitle>
                <GraphSub>
                  View percentages of specific types of riders
                </GraphSub>
                <DropRow>
                  <Dropdown
                    isOpen={this.state.dropdownOpen2}
                    toggle={this.togglePlan}
                  >
                    <DropdownToggle caret color="primary">
                      {this.state.planDuration}
                    </DropdownToggle>
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
                    <DropdownToggle caret color="primary">
                      {this.state.tripType}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.selectTrip}>
                        One Way
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.selectTrip}>
                        Round Trip
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </DropRow>
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
                    return (
                      <Row>
                        <Card
                          stat={`${data.breakDown.percentage.toFixed(2)}%`}
                          text="Of Riders"
                        />
                        <SmallTextCont>
                          <h4>Current Filter(s):</h4>
                          <h4>{this.state.planDuration}</h4>
                          <h4>{this.state.tripType}</h4>
                        </SmallTextCont>
                      </Row>
                    )
                  }}
                </Query>
              </Jumbotron>
              <Jumbotron>
                <GraphTitle>Change of Bike Over Day</GraphTitle>
                <GraphSub>
                  How we can best displace bikes throughout the day
                </GraphSub>
                <hr />
              </Jumbotron>
              <Graph>
                <GraphTitle>Most Popular Start/Stop Station</GraphTitle>
                <Query query={GET_TEN_START} fetchPolicy="cache-and-network">
                  {({ loading, error, data }) => {
                    if (loading) return <p>Loading</p>
                    if (error) return <p>{error}</p>
                    const x = data.topTenStartStations.map(
                      station => `ID${station.id.toString()}`
                    )
                    const y = data.topTenStartStations.map(
                      station => station.count
                    )
                    return (
                      <Wrapper>
                        <Plot
                          data={[
                            { type: 'bar', x, y, marker: { color: '#007bff' } }
                          ]}
                          layout={{
                            width: '50%',
                            height: '40vw',
                            title: 'Top Ten Most Popular Start Stations'
                          }}
                        />
                      </Wrapper>
                    )
                  }}
                </Query>
                <Query query={GET_TEN_STOP} fetchPolicy="cache-and-network">
                  {({ loading, error, data }) => {
                    if (loading) return <p>Loading</p>
                    if (error) return <p>{error}</p>
                    const x = data.topTenStopStations.map(
                      station => `ID${station.id.toString()}`
                    )
                    const y = data.topTenStopStations.map(
                      station => station.count
                    )
                    return (
                      <Wrapper>
                        <Plot
                          data={[
                            { type: 'bar', x, y, marker: { color: '#007bff' } }
                          ]}
                          layout={{
                            width: '50vw',
                            height: '40vw',
                            title: 'Top Ten Most Popular Stop Stations'
                          }}
                        />
                      </Wrapper>
                    )
                  }}
                </Query>
              </Graph>
              <Graph>
                <GraphTitle>
                  Average Distance Travelled / Average Trip Duration
                </GraphTitle>
                <GraphSub>
                  The average distance travelled for a round trip is greater
                  than twice that of a one way trip. The values were calculated
                  this way. For a one way trip, we are given the longitude and
                  the latitude of the start and end stations (excluding trivial
                  NULL cases). We use manhattan distance rather than euclidian
                  distance since it is more realistic that bikes will travel
                  along the grid system rather than cutting through the road. We
                  use the haversine calculations to get the correct distances.
                  For a round trip, since we do not know the coordinates for the
                  start and end stations, we use the duration of the trip as
                  well as an educated assumption about the average speed of the
                  bicycle. An article relased by the MIT tech review had
                  revealed a reasonable estimate of approximately 6 mph rate for
                  bikers in the city. Thus, the total distance would be a
                  product of the duration in hours and the approximate speed of
                  bikes in the city.
                </GraphSub>
                <GraphSub>
                  I have also calculated the average trip duration. This is
                  adjustable for each plan holder; either walk on, monthly, or
                  yearly. Suprisingly, those who walk on spend more time on
                  average on the bike rather than those who own a pass. This can
                  be due to a few reasons. First, we know that there is some max
                  duration in the dataset that no trip can go past. The reason
                  for why some walk-on bikers were charged for the max duration
                  is unclear.
                </GraphSub>
                <Row>
                  <ButtonGroup>
                    <Button
                      key="1"
                      onClick={this.selectButton0}
                      color="primary"
                    >
                      One Way
                    </Button>
                    <Button
                      key="2"
                      onClick={this.selectButton0}
                      color="primary"
                    >
                      Round Trip
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button
                      key="1"
                      onClick={this.selectButton1}
                      color="primary"
                    >
                      0
                    </Button>
                    <Button
                      key="2"
                      onClick={this.selectButton1}
                      color="primary"
                    >
                      30
                    </Button>
                    <Button
                      key="3"
                      onClick={this.selectButton1}
                      color="primary"
                    >
                      365
                    </Button>
                  </ButtonGroup>
                </Row>
                <Row>
                  <Query
                    query={GET_AVG_DIST}
                    fetchPolicy="cache-and-network"
                    variables={{ input: this.state.tripAvg }}
                  >
                    {({ loading, error, data }) => {
                      if (loading) return <p>Loading</p>
                      if (error) return <p>{error}</p>
                      return (
                        <div>
                          <Card
                            stat={data.averageDistanceTravelled.toFixed(2)}
                            text="Average Distance Travelled (miles)"
                          />
                        </div>
                      )
                    }}
                  </Query>

                  <Query
                    query={GET_AVG_DUR}
                    fetchPolicy="cache-and-network"
                    variables={{ input: this.state.planType }}
                  >
                    {({ loading, error, data }) => {
                      if (loading) return <p>Loading</p>
                      if (error) return <p>{error}</p>
                      return (
                        <div>
                          <Card
                            stat={data.averageTripDuration.toFixed(2)}
                            text="Average Trip Duration (minutes)"
                          />
                        </div>
                      )
                    }}
                  </Query>
                </Row>
              </Graph>
              <Graph>
                <GraphTitle>Regular Commute</GraphTitle>
                <Query query={GET_REG} fetchPolicy="cache-and-network">
                  {({ loading, error, data }) => {
                    if (loading) return <p>Loading</p>
                    if (error) return <p>{error}</p>
                    return (
                      <div>
                        <b>{data.regular.toFixed(2)}%</b> of people who use bike
                        sharing service use bikes as a part of their regular
                        commute. This number was found by taking the total
                        number of entries in the dataset, finding the number of
                        people using either a monthly or a yearly pass, and
                        taking the ratio between the two numbers.
                      </div>
                    )
                  }}
                </Query>
              </Graph>
              <Graph>
                <GraphTitle>Top 10 Routes</GraphTitle>
                <GraphSub>
                  The most common routes taken by bike sharing service users are
                  the following represented in the graph. The number was found
                  by taking the ten most common point A to point B trips. We
                  notice that the route between station 3030 and 3014 is very
                  popular; in fact, the first top two most common routes both
                  involve those two stations. This makes sense since station
                  3014 is the nearest station to the train station, union
                  station. As commuters avoiding using personal vehicles to
                  work, biking from a reasonable bike station to the train
                  station allows for a quick and car-less commute.
                </GraphSub>
                <Query query={GET_TOP_ROUTES} fetchPolicy="cache-and-network">
                  {({ loading, error, data }) => {
                    if (loading) return <p>Loading</p>
                    if (error) return <p>{error}</p>
                    const x = data.topTenRoutes.map(
                      route =>
                        `${route.startStationId} to ${route.endStationId}`
                    )
                    const y = data.topTenRoutes.map(route => route.frequency)
                    return (
                      <Wrapper>
                        <Plot
                          data={[
                            { type: 'bar', x, y, marker: { color: '#007bff' } }
                          ]}
                          layout={{
                            width: '50vw',
                            height: '40vw',
                            title: 'Top 10 Routes Taken'
                          }}
                        />
                      </Wrapper>
                    )
                  }}
                </Query>
              </Graph>
              <Graph>
                <GraphTitle>Weekends VS Weekdays</GraphTitle>
                <GraphSub>
                  Here we see that for the Los Angeles population, bike sharing
                  is used more during a weekday than a weekend-day, on average.
                  Part of this reason for 1000+ more rides a day can be due to
                  the fact that bike sharing services are commonly used for
                  commuting to work. This result follows the trend (that bikes
                  seem to be used frequently for commutes) that has been seen in
                  other parts of this project.
                </GraphSub>
                <Row>
                  <Card stat={17916.5} text="Total Average Weekend Trips" />
                  <Card stat={19318.8} text="Total Average Weekday Trips" />
                </Row>
              </Graph>
              <Graph>
                <GraphTitle>Peak Rental Hours</GraphTitle>
                <GraphSub>
                  Below is a bar graph depicting the total number of rides that
                  have started in each 24 hours of a day for the entire dataset.
                  We immediately notice a few spikes in the graph. The first
                  being the massive growth at around 7, 8, and even 9 AM. We
                  can, again speculate that this might be due to many commuters
                  wishing to abandon their personal vehicle for now. The second
                  being the noticeable spike at around 5 and 6 pm. This, again,
                  shows the commuters using the bikes at around those times to
                  commute back to home. It seems that for many, in order to
                  circumvent the rush hours of LA, bike sharing is an efficient
                  way for them to get home.
                </GraphSub>
                <Query query={GET_PEAK_HOURS} fetchPolicy="cache-and-network">
                  {({ loading, error, data }) => {
                    if (loading) return <p>Loading</p>
                    if (error) return <p>{error}</p>
                    const x = data.peakHours.map(hour => `HR${hour.hour}`)
                    const y = data.peakHours.map(hour => hour.frequency)
                    return (
                      <Plot
                        data={[
                          { type: 'bar', x, y, marker: { color: '#007bff' } }
                        ]}
                        layout={{
                          width: '50vw',
                          height: '40vw',
                          title: 'Total bike rides by hour'
                        }}
                      />
                    )
                  }}
                </Query>
              </Graph>
            </Container>

            <Footer />
          </PreWrapper>
        </Wrapper>
      </div>
    )
  }
}

export default Home
