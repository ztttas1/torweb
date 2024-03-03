const fs = require('node:fs');
const path = require('node:path');

const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname + '/public/')));

const hostname = fs.readFileSync(`${process.cwd()}/tor/hidden_service/hostname`, 'utf8');

app.listen(80, ()=>{
  console.log("\x1b[33m[Express]\x1b[0m \x1b[36mServer Listening at PORT 80.\x1b[0m");
	console.log(`\x1b[33m[Express]\x1b[0m \x1b[36mView your onion service using the Tor Browser at http://${hostname}.\x1b[0m`);
})
