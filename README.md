# copenhacks-workshop
Code for Twilio Workshop at CopenHacks


## Requirements:

- A Twilio Account [(sign up for free)](https://www.twilio.com/try-twilio)
- Node.js [(download for free)](https://nodejs.org/en/download/)

## Setup:

#### 1. Clone project

```bash
git clone https://github.com/dkundel/emoji-chat-demo.git
cd emoji-chat-demo
npm install
cp .env.example .env
```

#### 2. Configure `.env` file

- Open the `.env` file in the project
- Add your Twilio Account SID from the [Twilio Console](https://www.twilio.com/console)
- [Create a set of API Key/Secret in the Twilio Console](https://www.twilio.com/console/dev-tools/api-keys) and add them in the `.env` file
- [Create a new Twilio Chat Service](https://www.twilio.com/console/chat/services) and add the Service SID
- Save the file

#### 3. Start the Server

Run:

```bash
npm start
```

#### 4. Go to [http://localhost:3000](http://localhost:3000)

## Questions?

Message [dkundel@twilio.com](mailto:dkundel@twilio.com) or tweet [@dkundel](https://twitter.com/dkundel)

## License

MIT

## Contributors

- Dominik Kundel <dkundel@twilio.com>