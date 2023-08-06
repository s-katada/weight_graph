class AddUserIdToWeightLogs < ActiveRecord::Migration[7.0]
  def change
    add_reference :weight_logs, :user, null: false, foreign_key: true
  end
end
