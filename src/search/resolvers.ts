

export const resolvers = {
  
  Query: {
    search: (_: any, query : string) => {
      console.log('searching', query);
      return [
        { symbologyId: '1', rank: 0.9,  lastUpdated: '2025-01-01' },
        { symbologyId: '2', rank: 0.84, lastUpdated: '2025-01-01' }
      ];
    },
  },

  SearchResult: {
    instrument: (result: { symbologyId: string }) => {
      console.log('Resolving instrument for search result:', result);
      return { __typename: 'Instrument', symbologyId: result.symbologyId };
    },
  }
};