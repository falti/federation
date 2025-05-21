import gql from 'graphql-tag';

export const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@external", "@shareable","@requires"])

enum SymbologyType {
  ISIN
  VALOR
  FIGI
}

type Instrument @key(fields: "symbologyId") {
  symbologyId: ID!
  name: String!
  price: Float!  
}

type Symbology @key(fields: "id") {
  id: ID! # Resolve locally
  symbols: [Symbol!]! @shareable
}

type Symbol {
  symbol: String! @shareable
  type: SymbologyType! @shareable
}

type Query {
  instrument(id: ID!): Instrument
  instruments: [Instrument!]!
}
`;