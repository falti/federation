import { gql } from 'graphql-tag';

export const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@external", "@shareable", "@requires"])

enum SymbologyType {
  ISIN
  VALOR
  FIGI
}

type Watchlist {
  id: ID!
  name: String
  items: [WatchlistItem!]!
}

type WatchlistItem {
  id: ID!
  symbologyId: ID!
  instrument: Instrument! # References Instrument entity
  # Remove name to avoid duplication with Instrument.name
}

input WatchlistItemInput {
  symbol: String!
  type: SymbologyType!
}

type Instrument @key(fields: "symbologyId") {
  symbologyId: ID!  
}

type Symbology @key(fields: "id") {
  id: ID! @external
  symbols: [Symbol!]! @shareable
}

type Symbol {
  symbol: String! @shareable
  type: SymbologyType! @shareable
}

type Query {
  watchlist(id: ID!): Watchlist
  watchlists: [Watchlist!]!
}

type Mutation {
  createWatchlist(name: String!): Watchlist!
  addToWatchlist(id: ID!, items: [WatchlistItemInput!]!): Watchlist!
  removeFromWatchlist(id: ID!, items: [ID!]!): Watchlist!
  deleteWatchlist(id: ID!): Boolean!
}
`;