import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => {
  console.log(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/iedp?authSource=admin ---------------`,
  );
  return {
    uri: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/iedp?authSource=admin`,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
});
