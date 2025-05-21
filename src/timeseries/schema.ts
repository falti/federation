import { gql } from 'graphql-tag';

export const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@external", "@shareable", "@requires"])

type TimeSeries {
  symbologyId: ID!
  timestamps: [String!]! # ISO 8601 timestamps (e.g., "2025-05-21T00:00:00Z")
  metrics: TimeSeriesMetrics!
}

type TimeSeriesMetrics {
  open: [Float!] # Array of opening prices
  high: [Float!] # Array of high prices
  low: [Float!] # Array of low prices
  close: [Float!] # Array of closing prices
  volume: [Int!] # Array of trading volumes
}

type Instrument @key(fields: "symbologyId") {
  symbologyId: ID! # Resolve locally
  timeseries: TimeSeries!
}


`;