Rails.application.routes.draw do
  root 'pages#home'
  resources :web_links, only: [:index, :create, :update, :destroy]
end