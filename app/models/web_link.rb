class WebLink < ApplicationRecord
  belongs_to :area
  after_create_commit { broadcast_create_link }
  after_update_commit { broadcast_update_link }
  after_destroy_commit { broadcast_destroy_link }

  private

  def broadcast_create_link
    ActionCable.server.broadcast('WebLinksChannel', { action: 'create', broadcasted_web_link: {
      id:,
      name:,
      web_url:,
      area_id:,
    }})
  end

  def broadcast_update_link
    ActionCable.server.broadcast('WebLinksChannel', { action: 'update', broadcasted_web_link: {
      id:,
      name:,
      web_url:,
      area_id:,
    }})
  end

  def broadcast_destroy_link
    ActionCable.server.broadcast('WebLinksChannel', { action: 'destroy', broadcasted_web_link: {
      id:,
      name:,
      web_url:,
      area_id:,
    }})
  end
end