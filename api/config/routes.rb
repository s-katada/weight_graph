Rails.application.routes.draw do
  resources :weight_logs, only: %i[index create]
end
