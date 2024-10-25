const { mongoose } = require("mongoose");
const connectToDB = async () => {
  const connectionUrl = "mongodb://127.0.0.1:27017/job-portal";
  mongoose
    .connect(connectionUrl)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log(error));
};

export default connectToDB;
