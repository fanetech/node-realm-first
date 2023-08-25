exports.studentModel = {
  name: "student",
    primaryKey: "_id",
    properties: {
      _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
      name: "string",
      age: "int",
      number: "int?",
      storeId: { type: 'objectId', indexed: true },
    }
}