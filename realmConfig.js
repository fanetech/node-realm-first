const { getAtlasApp } = require("./atlasAppService/getAtlasApp");
const { studentModel } = require("./model");
const Realm = require('realm');

let app = getAtlasApp();
let realm;

function getRealm() {
  return realm;
}

const openRealm = async () => {
  try {
    realm = await Realm.open({
      schema: [studentModel],
    });
    return realm;
    
  } catch (error) {
    console.log('openRealm error: ', error);
    throw error;
  }
}

function closeRealm() {
  if (realm && !realm.isClosed) {
    console.info('Closing the realm...');
    realm.close();
    console.info('Realm closed.');
  }
  realm = null;
}

module.exports = {
  openRealm,
  closeRealm,
  getRealm
}