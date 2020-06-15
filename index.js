const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbName = 'conFusion';

// th client takes 2 param in callback
mongoClient.connect(url, (err, client)=>{
    assert.equal(err, null);
    console.log('Connected to server..');
    // chosing the db name after the connection is succesful
    const db = client.db(dbName);
    // Select the collection
    const collection = db.collection('dishes');
    // collection. will give you 2-3 methods to insert data
    // that insert function's 2nd param is a callback
    collection.insertOne({"name": "Green wave mexican pizza", "description": "Yummy!"}, (err, result)=>{
        assert.equal(err, null);
        console.log("Data inserted into collection");
        console.log(result.ops);
        collection.find({}).toArray((err, docs)=>{
            //2nd params docs refers to all the doccuments in the collection
            assert.equal(err, null);
            console.log("Found documents");
            console.log(docs);
            // method to drop the collection
            db.dropCollection('dishes', (err, result)=>{
                assert.equal(err, null);
                client.close();
            })
        })
    });
})