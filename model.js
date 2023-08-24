exports.studentModel = {
  name: "student",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      name: "string",
      age: "int",
      number: "int?",
      storeId: { type: 'objectId', indexed: true },
    }
}