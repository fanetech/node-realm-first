const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const {openRealm} = require('./realmConfig');
const { getStudent, addStudent, getOneStudent, getAllStudent } = require('./realmQuery');

const exampleEmail = 'john@doe.com';
const examplePassword = '123456';

async function main() {
  // let success = await register(exampleEmail, examplePassword);
  // if (!success) {
  //   return;
  // }

  // success = await logIn(exampleEmail, examplePassword);
  // if (!success) {
  //   return;
  // }

  await openRealm();

}
app.use(express.json())

app.get('/', async (req, res) =>{
const gettStudent = await getAllStudent();
res.send(gettStudent)
} );

app.post('/', async (req, res) =>{
  const adddStudent = await addStudent(req.body);
  res.send(adddStudent)
} );

app.get('/:id', async (req, res) =>{
  const student = await getOneStudent(req.params.id);
  res.send(student)
} );

app.listen(port, async () => {
  await main();
  console.log(`Listening on port ${port}..`)
});