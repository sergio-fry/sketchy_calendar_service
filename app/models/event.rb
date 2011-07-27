class Event < ActiveRecord::Base
  belongs_to :user

  validates :user_id, :presence => true
  validates :title, :presence => true
  validates :starts_on, :presence => true

  scope :from_to, lambda {|from, to| where("starts_on >= ? AND starts_on <= ?", from, to)}

end
