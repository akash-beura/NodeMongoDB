const assert = require("assert");

exports.insertDocument = (db, document, collection, callback) => {
  // get hold of collection
  const coll = db.collection(collection);
  coll.insert(document, (err, result) => {
    assert.equal(err, null);
    // result object contains a property result
    console.log(
      "Inserted " +
        result.result.n +
        " documents into the collection " +
        collection
    );
    // after you got the result, pass it back to the calling function.
    callback(result);
  });
};

exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  // we want to find out all the documnets, thats why we use a {} empty obj here.
  coll.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  });
};

exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.deleteOne(dcoument, (err, result) => {
    assert.equal(err, null);
    console.log("Removed the document: ", document);
    callback(result);
  });
};

exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  coll.updateOne(document, { $set: update }, null, (err, result) => {
    assert.equal(err, null);
    console.log("Updated the document with ", update);
    callback(result);
  });
};
