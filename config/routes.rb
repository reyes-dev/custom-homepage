Rails.application.routes.draw do
  # action cable server
  mount ActionCable.server => '/cable'
  root 'pages#home'
  resources :web_links, only: [:index, :create, :update, :destroy]
  resources :areas, only: [:index, :create, :update, :destroy]
end