const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const {openRealm, logIn, register, confirmEmail} = require('./realmConfig');
const { getStudent, addStudent, getOneStudent, getAllStudent, deleteStudent, updateStudent } = require('./realmQuery');

const exampleEmail = 'louguefranck.20@gmail.com';
const examplePassword = '123456';

async function main() {
  let success = await register(exampleEmail, examplePassword);
  if (!success) {
    console.log('Register failed.');
    return;
  }

  success = await logIn(exampleEmail, examplePassword);
  if (!success) {
    return;
  }

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
app.get('/conirm', async (req, res) =>{
  // console.log(req.query.token)
  const confirm = await confirmEmail(req.query.token, req.query.tokenId);
  res.send(confirm)
} );

app.get('/:id', async (req, res) =>{
  const student = await getOneStudent(req.params.id);
  res.send(student)
} );

app.delete('/:id', async (req, res) =>{
  const student = await deleteStudent(req.params.id);
  res.send(student)
} );

app.put('/:id', async (req, res) =>{
  const student = await updateStudent(req.params.id, req.body);
  res.send(student) 
} );



app.listen(port, async () => {
  await main();
  console.log(`Listening on port ${port}..`)
});