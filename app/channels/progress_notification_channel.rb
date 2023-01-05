class ProgressNotificationChannel < ApplicationCable::Channel
  def subscribed
    stream_from "progress_notification_channel"

    # Use the following somewhere to send data to the client
    # ActionCable.server.broadcast "progress_notification_channel", data
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    # ActionCable.server.broadcast "progress_notification_channel", data
  end
end
