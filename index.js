const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOperation = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbName = 'conFusion';

// th client takes 2 param in callback
mongoClient.connect(url, (err, client)=>{
    assert.equal(err, null);
    console.log('Connected to server..');
    // chosing the db name after the connection is succesful
    const db = client.db(dbName);
    
    dbOperation.insertDocument(db, {"name":"abcd", "description":"test"}, "dishes", (result)=>{
        
        console.log("Insert document:\n", result.ops);

        dbOperation.findDocuments(db, "dishesh", (docs)=>{
            console.log("Found documents:\n", docs);

            // update == field which you want to update
            dbOperation.updateDocument(db, {"name":"abcd"}, {"description":"updated test"}, "dishes", (result)=>{
                console.log("Updated document: \n", result.result);
                db.dropCollection('dishes', (err, result)=>{
                    console.log("Dropped collection dishes: ", result);
                })
            });
        });
    }); 
});