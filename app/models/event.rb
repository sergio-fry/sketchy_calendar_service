class Event < ActiveRecord::Base
  belongs_to :user

  validates :user_id, :presence => true
  validates :title, :presence => true
  validates :starts_on, :presence => true

  scope :from_to, lambda {|from, to| where("starts_on >= ? AND starts_on <= ?", from, to)}

  def occurs_on?(date)
    (starts_on.day == date.day && ((starts_on - date).abs <= 1.day) && week_days.blank?) || ((starts_on <= date) && week_days.include?(date.wday))
  end


  def week_days
    days = read_attribute(:week_days).split(",").map(&:to_i).reject{|day| !(1..6).to_a.include?(day)} rescue []
  end

  def self.find_with_repeatings(user, from, to)
    current_date = from
    events_with_repeatings = []

    events = user.events.where("starts_on < ?", to)

    while current_date <= to
      events.each do |event|
        if event.occurs_on?(current_date)
          cloned_event = event.clone
          cloned_event.starts_on = current_date
          events_with_repeatings << cloned_event
        end
      end
      current_date = current_date + 1.day
    end

    events_with_repeatings
  end

end
