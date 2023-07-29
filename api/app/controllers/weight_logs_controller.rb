# 体重記録のコントローラー
class WeightLogsController < ApplicationController
  def index
    weight_logs = WeightLog.all
    proceeded_weight_logs = weight_logs.map { |wl| { weight: wl.weight, date: l(wl.date, format: :default) } }
    render json: proceeded_weight_logs
  end

  def create
    render json: params
  end
end
