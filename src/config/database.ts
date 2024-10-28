import { connection, connect, set, ConnectOptions } from 'mongoose';

const { MONGO_URL } = process.env;

(function SetupDatabase(): void {
  const { readyState } = connection;

  if (readyState !== 1 && readyState !== 2) {
    set('strictQuery', false);
    connect(MONGO_URL as string)
      .then(() => {
        console.log('INFO - MongoDB Database connected.');
      })
      .catch((err: Error) => console.log('ERROR - Unable to connect to the database:', err));
  }
}());
