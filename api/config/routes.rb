Rails.application.routes.draw do
  resources :weight_logs, only: [:index, :create]
end
