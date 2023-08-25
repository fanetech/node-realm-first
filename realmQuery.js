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
    console.log(new BSON.ObjectId(id))
    return realm ? realm.objectForPrimaryKey(studentModel.name, new BSON.ObjectId(id)) : null;
    // return realm ? realm.objects(studentModel.name).filtered('_id = $0', new BSON.ObjectId(id)) : null;
}

function getAllStudent() {
    const realm = getRealm();
    return realm ? realm.objects(studentModel.name) : null;
}

async function deleteStudent(id) {
    try {
        const realm = getRealm();
        let response;
        const student = await getOneStudent(id);
        if (!student) {
            return 'object not found';
        }
        realm.write(() => {
            response = realm ? realm.delete(student) : null;
        });
        if(!response){
            return 'object not deleted';
        }
        return 'object deleted';
    } catch (error) {
        console.log(error)
    }
   
}

async function updateStudent(id, payload) {
    const realm = getRealm();
    let newCreatedStudent;
    const student = await getOneStudent(id);
    if (!student) {
        return 'object not found';
    }
    if (realm) {
        realm.write(() => {
            newCreatedStudent = realm.create(studentModel.name, {
                _id: new BSON.ObjectId(student._id),
                name: payload.name,
                age: payload.age,
                number: payload.number,
            }, 'modified');
        });
        return newCreatedStudent;
    }
}


module.exports = {
    addStudent,
    getStudent,
    getOneStudent,
    getAllStudent,
    deleteStudent,
    updateStudent
}