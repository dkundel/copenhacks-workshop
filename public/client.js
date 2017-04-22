var channel;

function displayMessage(message) {
  var element = $('<p>').text(message);
  element.prependTo('#chatMessages');
}

$('form').submit(function (evt) {
  evt.preventDefault();
  var msg = $('#message').val();
  if (channel) {
    channel.sendMessage(msg);
    $('#message').val('');
  }
});

$.getJSON('/token', function (data) {
  var client = new Twilio.Chat.Client(data.token);

  client.initialize()
    .then(function () {
      return client.getChannelByUniqueName('boats');
    })
    .then(function (ch) {
      return ch;
    }, function () {
      return client.createChannel({ uniqueName: 'boats' });
    })
    .then(function (ch) {
      channel = ch;
      channel.on('messageAdded', function (message) {
        displayMessage(message.body);
      })
      return channel.join();
    })
    .then(function () {
      channel.getMessages().then(function (messages) {
        messages.items.forEach(function (message) {
          displayMessage(message.body);
        })
      })
    })
})