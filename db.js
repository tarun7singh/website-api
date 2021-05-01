const mongoose = require("mongoose");

const connUri = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {
  dbConnect: async () => {
    try {
      await mongoose.connect(connUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
