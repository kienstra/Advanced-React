import { config, createSchema } from '@keystone-next/keystone/schema'
import 'dotenv/config';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial'

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long should they stay signed in?
  secret: process.env.COOKIE_SECRET,
}

export default config({
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
    // Schema items here
  }),
  ui: {
    // @todo: Change this for roles
    isAccessAllowed: () => true,
  },
  // @todo: Add session values.
});
