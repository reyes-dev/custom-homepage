class Area < ApplicationRecord
  has_many :web_links, dependent: :destroy
  after_create_commit { broadcast_create_area }
  after_destroy_commit { broadcast_destroy_area }

  private
  def broadcast_create_area
    ActionCable.server.broadcast('AreasChannel', { action: 'create', broadcasted_area: {
      id:,
      name:,
    }})
  end

  def broadcast_destroy_area
    ActionCable.server.broadcast('AreasChannel', { action: 'destroy', broadcasted_area: {
      id:,
      name:,
    }})
  end
end
