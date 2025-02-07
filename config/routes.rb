Rails.application.routes.draw do
  root "application#home"

  resources :bookmarks, only: [ :create ]

  resources :bookmarks, only: [ :index, :destroy ]
end
