class AddWeekDaysToEvents < ActiveRecord::Migration
  def self.up
    add_column :events, :week_days, :string
  end

  def self.down
    remove_column :events, :week_days
  end
end
