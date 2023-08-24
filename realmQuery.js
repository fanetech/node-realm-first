const { BSON } = require("realm");
const { studentModel } = require("./model");
const { getRealm } = require("./realmConfig");
const { SYNC_STORE_ID } = require("./atlasAppService/config");

function addStudent(payload) {
    const realm = getRealm();
    let newCreatedStudent;
    if (realm) {
        realm.write(() => {
            newCreatedStudent = realm.create(studentModel.name, {
                _id: new BSON.ObjectId(),
                storeId: SYNC_STORE_ID,
                name: payload.name,
                age: payload.age,
                number: payload.number,
            });
        });
        return newCreatedStudent;
    }
}

function getStudent() {
    const realm = getRealm();
    return realm ? realm.objects(studentModel.name).filtered('storeId = $0', SYNC_STORE_ID) : [];
}

function getOneStudent(id) {
    const realm = getRealm();
    console.log(id)
    return realm ? realm.objects(studentModel.name).filtered('_id = $0', id) : null;
}

function getAllStudent() {
    const realm = getRealm();
    return realm ? realm.objects(studentModel.name) : null;
}



module.exports = {
    addStudent,
    getStudent,
    getOneStudent,
    getAllStudent
}