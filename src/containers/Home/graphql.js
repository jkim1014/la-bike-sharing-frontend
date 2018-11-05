import gql from 'graphql-tag'

export const GET_DEFICIT = gql`
  query {
    bike {
      station
      deficit
    }
  }
`

export const GET_TEN_START = gql`
  query {
    topTenStartStations {
      id
      longitude
      latitude
      count
    }
  }
`

export const GET_TEN_STOP = gql`
  query {
    topTenStopStations {
      id
      longitude
      latitude
      count
    }
  }
`

export const GET_AVG_DUR = gql`
  query averageTripDuration($input: Int) {
    averageTripDuration(planDuration: $input)
  }
`

export const GET_AVG_DIST = gql`
  query averageDistanceTravelled($input: String) {
    averageDistanceTravelled(tripType: $input)
  }
`

export const GET_REG = gql`
  query {
    regular
  }
`

export const GET_PEAK_HOURS = gql`
  query {
    peakHours {
      hour
      frequency
    }
  }
`

export const GET_TOP_ROUTES = gql`
  query {
    topTenRoutes {
      startStationId
      endStationId
      frequency
    }
  }
`

export const GET_BREAK_DOWN = gql`
  query breakDown($input: BreakDownInput!) {
    breakDown(input: $input) {
      percentage
    }
  }
`

export const GET_SEASON = gql`
  query seasonal($input: String!) {
    seasonal(season: $input) {
      mostUsedPlan
      averageTripDuration
      topThreeStations {
        id
        longitude
        latitude
      }
    }
  }
`
