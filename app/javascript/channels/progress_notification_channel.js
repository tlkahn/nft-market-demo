import consumer from './consumer';

const progressNotificationChannel = consumer.subscriptions.create(
  'ProgressNotificationChannel',
  {
    connected() {
      // console.log('connected');
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      console.log(data);
      $('.progress-bar')
        .css('width', data.value + '%')
        .attr('aria-valuenow', data.value);
      $('.progress-text').text(data.text);
      // Called when there's incoming data on the websocket for this channel
    },
  }
);
