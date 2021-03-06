import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema'
import { statelessSessions, withItemData } from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { CartItem } from './schemas/CartItem';
import { Order } from './schemas/Order';
import { OrderItem } from './schemas/OrderItem';
import 'dotenv/config';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';
import { extendGraphqlSchema } from './mutations';

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
  },
  passwordResetLink: {
    async sendToken(args) {
      await sendPasswordResetEmail(args.token, args.identity);
      console.log(args)
    },
  },
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
    async onConnect(keystone) {
      if ( process.argv.includes( '--seed-data' ) ) {
        await insertSeedData( keystone )
      }
    },
  },
  lists: createSchema({
      User,
      Product,
      ProductImage,
      CartItem,
      OrderItem,
      Order,
  }),
  extendGraphqlSchema,
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
