# 体重記録のコントローラー
class WeightLogsController < ApplicationController
  before_action :authenticate_user!
  def index
    weight_logs = WeightLog.all
    proceeded_weight_logs = weight_logs.map { |wl| { weight: wl.weight, date: I18n.l(wl.date, format: :short) } }
    render json: proceeded_weight_logs
  end

  def create
    render json: params
  end
end
