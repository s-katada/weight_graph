Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  resources :weight_logs, only: %i[index create]
end
