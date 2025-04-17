import { index, onchainTable, relations } from 'ponder';

export const accounts = onchainTable('accounts',
  (t) => ({
    address: t.hex().primaryKey(),
    total_staked: t.integer().notNull(),
    attestationUID : t.hex(),
  }),
  (table) => ({
    addressIdx: index().on(table.address),
  })
);

export const accountsRelations = relations(accounts, ({ many }) => ({
  tokens: many(tokens)
}));

export const tokens = onchainTable('tokens', 
  (t) => ({
    id: t.integer().primaryKey(),
    owner: t.hex().notNull(),
    staked: t.boolean().notNull(),
  }),
  (table) => ({
    idIdx: index().on(table.id),
    ownerIdx: index().on(table.owner),
  })
);

export const tokensRelations = relations(tokens, ({ one, many }) => ({
  owner: one(accounts, { fields: [tokens.owner], references: [accounts.address] }),
  events: many(events)
}));

export const events = onchainTable('events',
  (t) => ({
      id: t.text().primaryKey(),
      event: t.text().notNull(),
      token: t.integer().notNull(),
      timestamp: t.integer().notNull(),
    }),
  (table) => ({
    idIdx: index().on(table.id),
    tokenIdx: index().on(table.token),
  })
  );

  export const eventsRelations = relations(events, ({ one }) => ({
    token: one(tokens, { fields: [events.token], references: [tokens.id] }),
  }));
  