class WeightLogsController < ApplicationController
  def index
    render json: WeightLog.all
  end

  def create
    render json: params
  end
end
