const express = require('express');
const path = require('path');
const twilio = require('twilio');
const sillyname = require('sillyname');
const bodyParser = require('body-parser');

const AccessToken = twilio.jwt.AccessToken;
const IpMessagingGrant = AccessToken.IpMessagingGrant;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/token', (req, res) => {
   // Create an access token which we will sign and return to the client
    const token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );

    // Assign the generated identity to the token
    token.identity = sillyname();
    
    // Create a 'grant' which enables a client to use IPM as a given user,
    // on a given device
    const ipmGrant = new IpMessagingGrant({
        serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
        endpointId: 'Demo:' + token.identity + ':Browser'
    });
    token.addGrant(ipmGrant);
   
    //Serialize the token to a JWT string and include it in a JSON response
    res.send({
        identity: token.identity,
        token: token.toJwt()
    });
});

app.post('/bots', (req, res) => {
  res.status(200).send('');

  var client = twilio();
  var chatService = client.chat.services(process.env.TWILIO_CHAT_SERVICE_SID);
  var channel = chatService.channels(req.body.ChannelSid);
  channel.members.create({
    identity: 'boatBot'
  }).then(() => {
    channel.messages.create({
      from: 'boatBot',
      body: req.body.Body + ' - 🚤🛥⛵️'
    });
  });
})

app.post('/call', (req, res) => {
  res.type('text/xml').send(`
  <Response>
    <Say voice="alice" language="en-GB">Thanks for calling in</Say>
    <Play>https://demo.twilio.com/docs/classic.mp3</Play>
  </Response>`);
  var client = twilio();
  var chatService = client.chat.services(process.env.TWILIO_CHAT_SERVICE_SID);
  var channel = chatService.channels('');
  channel.members.create({
    identity: 'boatBot'
  }).then(() => {
    channel.messages.create({
      from: 'boatBot',
      body: '📞' + req.body.From + ' calls in'
    });
  });
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

