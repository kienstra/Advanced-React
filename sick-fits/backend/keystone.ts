import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema'
import { User } from './schemas/User';
import 'dotenv/config';
import { statelessSessions, withItemData } from '@keystone-next/keystone/session';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial'

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long should they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email', // What do they log in with?
  secretField: 'password',
  initFirstItem: {
      fields: ['name', 'email', 'password'],
      // @todo: Add initial roles here.
  }
});

export default withAuth( config({
  server: {
      cors: {
          origin: [process.env.FRONTEND_URL],
          credentials: true,
      },
  },
  db: {
      adapter: 'mongoose',
      url: databaseURL,
      // @todo: Add data seeding here
  },
  lists: createSchema({
      User
  }),
  ui: {
    // Show UI only for people who meet this requirement.
    isAccessAllowed: ({ session }) => {
        return !!session?.data;
    }
  },
  session: withItemData( statelessSessions( sessionConfig), {
      User: `id`,
  })
}));
