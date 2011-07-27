class AddMonthDaysToEvents < ActiveRecord::Migration
  def self.up
    add_column :events, :month_days, :string
  end

  def self.down
    remove_column :events, :month_days
  end
end
