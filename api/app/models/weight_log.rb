class WeightLog < ApplicationRecord
  validates :weight, presence: true, numericality: { greater_than: 0.0 }
  validates :date, presence: true, uniqueness: true
end
