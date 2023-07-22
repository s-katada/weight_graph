class CreateWeightLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :weight_logs do |t|
      t.float :weight, null: false, default: 0.0
      t.datetime :date, null: false, default: -> { 'CURRENT_TIMESTAMP' }

      t.timestamps
    end
  end
end
