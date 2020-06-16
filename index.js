const mongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dbOperation = require("./operations");

const url = "mongodb://localhost:27017/";
const dbName = "conFusion";

// th client takes 2 param in callback
mongoClient
  .connect(url)
  .then((client) => {
    console.log("Connected to server..");
    // chosing the db name after the connection is succesful
    const db = client.db(dbName);

    dbOperation
      .insertDocument(db, { name: "abcd", description: "test" }, "dishes")
      .then((result) => {
        console.log("Insert document:\n", result.ops);
        return dbOperation.findDocuments(db, "dishesh").then((docs) => {
          console.log("Found documents:\n", docs);
          // update == field which you want to update
          return dbOperation
            .updateDocument( db, { name: "abcd" }, { description: "updated test" }, "dishes")
            .then((result) => {
              console.log("Updated document: \n", result.result);
              return db.dropCollection("dishes").then((result) => {
                console.log("Dropped collection dishes: ", result);
                client.close();
              }).catch((error) => console.log(error));
            }).catch((error) => console.log(error));
        }).catch((error) => console.log(error));
      }).catch((error) => console.log(error));
  }).catch((error) => console.log(error));
