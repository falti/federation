const watchlists = [
  {
    id: '1',
    name: 'My Watchlist',
    items: [
      { id: 2, symbologyId: '1'},
      { id: 1,symbologyId: '2'},
    ],
  },
];

export const resolvers = {
  Query: {
    watchlist: (_: any, args: { id: string }) => {
      return watchlists.find((watchlist) => watchlist.id === args.id);
    },
    watchlists: () => watchlists,
  },
  Mutation: {
    createWatchlist: (_: any, args: { name: string }) => {
      const watchlist = {
        id: `${watchlists.length + 1}`,
        name: args.name,
        items: [],
      };
      watchlists.push(watchlist);
      return watchlist;
    },
    addToWatchlist: (_: any, args: { id: string; items: any[] }) => {
      const watchlist = watchlists.find((watchlist) => watchlist.id === args.id);
      if (!watchlist) {
        throw new Error('Watchlist not found');
      }
      watchlist.items.push(...args.items);
      return watchlist;
    },
    removeFromWatchlist: (_: any, args: { id: string; items: any[] }) => {
      const watchlist = watchlists.find((watchlist) => watchlist.id === args.id);
      if (!watchlist) {
        throw new Error('Watchlist not found');
      }
      watchlist.items = watchlist.items.filter(
        (item) => !args.items.some((input) => input.id === item.symbologyId)
      );
      return watchlist;
    },
    deleteWatchlist: (_: any, args: { id: string }) => {
      const watchlist = watchlists.find((watchlist) => watchlist.id === args.id);
      if (!watchlist) {
        throw new Error('Watchlist not found');
      }
      watchlists.splice(watchlists.indexOf(watchlist), 1);
      return true;
    }
  },

  WatchlistItem: {
    instrument: ( instrument: { symbologyId: string }) => {
      console.log('Resolving instrument for watchlist item:', instrument);
      return { __typename: 'Instrument', symbologyId: instrument.symbologyId };
    },
  },

};
