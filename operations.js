const assert = require("assert");

exports.insertDocument = (db, document, collection, callback) => {
  // get hold of collection
  const coll = db.collection(collection);
  // it returns a promise
  return coll.insert(document);
};

exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  // we want to find out all the documnets, thats why we use a {} empty obj here.
  return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null);
};
