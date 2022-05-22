const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID; //change
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.get('/', (req, res)=> {
  res.send('this.is working');
})

app.post('/SendMessage',cors(), (req, res)=>{
    client.messages
      .create({body: req.body.message, from: '+19472214483', to: req.body.phone})
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