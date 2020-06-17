const { db } = require("@arangodb");
const log = module.context.collectionName("log");

if (!db._collection(log)) {
  // This won't be run if the collection exists
  const collection = db._createDocumentCollection(log);
  collection.ensureIndex({
    type: "hash",
    unique: true,
    fields: ["time"]
  });
  /*
  collection.save({
    username: "admin",
    password: auth.create("hunter2")
  });
  */
}