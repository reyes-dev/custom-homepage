class WebLink < ApplicationRecord
  after_create_commit { broadcast_link }

  private

  def broadcast_link
    ActionCable.server.broadcast('WebLinksChannel', {
      id:,
      name:,
      web_url:,
    })
  end
end
