Rails.application.routes.draw do
  # action cable server
  mount ActionCable.server => '/cable'
  root 'pages#home'
  resources :areas, only: [:index, :create, :update, :destroy] do
    resources :web_links, only: [:index, :create, :update, :destroy]
  end
end
