import { gql } from 'graphql-tag';

export const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@external", "@shareable", "@requires"])

enum SymbologyType {
  ISIN
  VALOR
  FIGI
}

type Symbology @key(fields: "id") {
  id: ID!
  symbols: [Symbol!]! @shareable
}

type Symbol {
  symbol: String! @shareable
  type: SymbologyType! @shareable
}

type Instrument @key(fields: "symbologyId") {
  symbologyId: ID! # Resolve locally
  symbology: Symbology!
}

type Query {
  symbology(symbol: String!, type: SymbologyType!): Symbology
  instrumentBySymbol(symbol: String!, type: SymbologyType!): Instrument
}
`;