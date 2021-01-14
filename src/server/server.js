import express from 'express';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('dist'));
const PORT = 4242;

app.get('/', (req, res) => {
  res.send(200)
});

app.listen(PORT, () => console.log('Server is running on port', PORT));