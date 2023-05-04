class Area < ApplicationRecord
  has_many :web_links, dependent: :destroy
end
