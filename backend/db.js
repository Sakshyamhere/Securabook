const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/notebook?directConnection=true";

const connectToMongo = async () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to mongo"))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToMongo;
