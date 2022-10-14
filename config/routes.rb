Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :users, only: [:index,:create]
  resources :products, only: [:index,:create,:update,:destroy]
  get '/me', to: 'users#show'
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
end
