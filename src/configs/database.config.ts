import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {
  const mongoUsername = process.env.MONGO_USERNAME;
  const mongoPassword = process.env.MONGO_PASSWORD;
  const mongoDbName = process.env.MONGO_DBNAME;
  const mongoUri = `mongodb+srv://${mongoUsername}:${encodeURIComponent(
    mongoPassword!
  )}@mydb.ohqugvw.mongodb.net/${mongoDbName}?appName=mydb`;
  console.log("MongoDB URI:", mongoUri); // Debugging line
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
