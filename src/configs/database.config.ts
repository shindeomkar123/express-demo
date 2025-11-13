import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {
  const mongoUsername = process.env.MONGO_USERNAME;
  const mongoPassword = process.env.MONGO_PASSWORD;
  const mongoDbName = process.env.MONGO_DBNAME;
  const mongoHost = process.env.MONGO_HOST || "mongo";
  const mongoUri = `mongodb://${mongoUsername}:${encodeURIComponent(
    mongoPassword!
  )}@${mongoHost}:27017/${mongoDbName}?authSource=admin`;
  connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
