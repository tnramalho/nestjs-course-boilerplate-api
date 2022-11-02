// export default () => ({
//   port: parseInt(process.env.PORT || '', 10) || 3000,
//   database: {
//     host: process.env.DATABASE_HOST || 'http://localhost:5432/',
//     port: parseInt(process.env.DATABASE_PORT || '', 10) || 5432,
//   },
// });

import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'htt://localhost',
  port: process.env.DATABASE_PORT || 5432,
}));
