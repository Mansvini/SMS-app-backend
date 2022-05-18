const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();

const accountSid = process.env.TWILIO_ACCOUNT_SID; //change
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.use(cors())
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!


app.get('/', (req, res)=> {
  res.send('this.is working');
})

app.post('/SendMessage', (req, res)=>{
    client.messages
      .create({body: req.body.message, from: '+19472214483', to: req.body.phone})
      .then(message => console.log(message.sid))
      .catch(err=>res.status(400).json('server error'));
})

app.get('/MessageHistory', (req, res)=>{
    client.messages.list({limit: 20})
        .then(messages => res.json(messages))
        .catch(err=>res.status(400).json('server error'));
})

app.listen(process.env.PORT, ()=> {
  console.log('app is running on port 3001');
})