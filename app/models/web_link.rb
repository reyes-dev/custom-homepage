class WebLink < ApplicationRecord
  after_create_commit { broadcast_create_link }
  after_update_commit { broadcast_update_link }

  private

  def broadcast_create_link
    ActionCable.server.broadcast('WebLinksChannel', { action: 'create', broadcasted_web_link: {
      id:,
      name:,
      web_url:,
    }})
  end

  def broadcast_update_link
    ActionCable.server.broadcast('WebLinksChannel', { action: 'update', broadcasted_web_link: {
      id:,
      name:,
      web_url:,
    }})
  end
end
