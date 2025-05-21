const instruments = [
  { name: 'Apple', price: 999.99, symbologyId: '1' },
  { name: 'UBS', price: 999.99, symbologyId: '2'}  
];

export const resolvers = {
  Query: {
    instrument: (_: any, id : string) => {
      console.log('resolve instrument', id);
      return instruments.find((instrument) => instrument.symbologyId === id);
    },
    instruments: () => instruments,
    
    
  },
  Instrument: {    
    __resolveReference: ({ symbologyId }: { symbologyId: string }) => {
      console.log('resolve instrument reference:', symbologyId);
      return instruments.find((instrument) => instrument.symbologyId === symbologyId);
    },
    symbology: (instrument: { symbologyId: string }) => {
      console.log('resolve symbology from instrument:', instrument);
      return { __typename: 'Symbology', id: instrument.symbologyId };    },
  },
};