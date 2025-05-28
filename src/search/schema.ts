import { gql } from 'graphql-tag';

export const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@external", "@shareable", "@requires"])

type SearchResult{
  symbologyId: ID!
  rank: Float! # Relevance rank for search results
  lastUpdated: String! # ISO 8601 timestamp of the last update  
  instrument: Instrument! # References Instrument entity
}



type Instrument @key(fields: "symbologyId") {
  symbologyId: ID!
}

type Query {
  search(query: String!): [SearchResult!]!
}
`;