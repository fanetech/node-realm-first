exports.studentModel = {
  name: "student",
  // sync WeatherSensor objects one way from your device
  // to your Atlas database.
  // asymmetric: true,
  primaryKey: "_id",
  properties: {
    _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
    name: "string",
    age: "int",
    number: "int?",
    storeId: { type: 'objectId', indexed: true },
  }
}