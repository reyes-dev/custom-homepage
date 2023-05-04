class AreasChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'AreasChannel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
