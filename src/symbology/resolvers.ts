const simulatedDatabase = [
  {
    id: '1',
    symbols: [
      { type: 'ISIN', symbol: 'US0378331005' },
      { type: 'VALOR', symbol: '037833100' },
      { type: 'FIGI', symbol: 'BBG000B9XRY4' },
    ],
  },
  {
    id: '2',
    symbols: [
      { type: 'ISIN', symbol: 'CH0244767585' },
      { type: 'VALOR', symbol: '24476758' },
      { type: 'FIGI', symbol: 'BBG00Q5MP7B3' },
    ],
  },
];

export const resolvers = {
  Query: {
    symbology: (_: any, args: { symbol: string; type: string }) => {
      // Find the record where any symbol matches the input type and symbol
      return simulatedDatabase.find((record) =>
        record.symbols.some((entry) => entry.symbol === args.symbol && entry.type === args.type)
      );
    },
    instrumentBySymbol: (_: any, args: { symbol: string; type: string }) => {
      //console.log('Resolving instrument by symbol:', args);
      // Find the record where any symbol matches the input type and symbol
      const record =  simulatedDatabase.find((record) =>
        record.symbols.some((entry) => entry.symbol === args.symbol && entry.type === args.type)
      );
      //console.log('Found record:', record);
      if (!record) {
        return null; // No matching record found
      }

      // Return a reference to the Instrument using the same ID
      return { __typename: 'Instrument', symbologyId: record.id };
    },
  },
  Symbology: {
    __resolveReference: (reference: { id: string }) => {
      console.log('Resolving symbology reference:', reference);
      // Find the record by id
      return simulatedDatabase.find((record) => record.id === reference.id);
    },
    instrument: (symbology: { id: string }) => {
      // Return a reference to the Instrument using the same ID
      return { __typename: 'Instrument', id: symbology.id };
    },
  },
  Instrument: {
    symbology: (instrument: { symbologyId: string }) => {
      console.log('Resolving symbology from instrument:', instrument);
      return simulatedDatabase.find((record) => record.id === instrument.symbologyId);
      // Return a reference to the Symbology using the same ID
      
    }
  },
};