# 体重記録のコントローラー
class WeightLogsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user

  def index
    binding.irb
    weight_logs = @user.weight_logs
    proceeded_weight_logs = weight_logs.map { |wl| { weight: wl.weight, date: I18n.l(wl.date, format: :short) } }
    render json: proceeded_weight_logs
  end

  def create
    render json: params
  end

  private

  def set_user
    @user = current_user
  end
end
