require 'test_helper'

class EventTest < ActiveSupport::TestCase
  def teardown
    User.destroy_all
    Event.destroy_all
  end

  test "search weekly repeating events" do
    @user = User.create(:name => "User", :uid => 1, :provider => :google)

    @event_1 = @user.events.create(:title => "Event 1", :starts_on => Time.local(2011, 7, 4), :week_days => "1,3,6")

    assert @event_1.occurs_on?(Time.local(2011, 7, 4))
    assert !@event_1.occurs_on?(Time.local(2011, 6, 28))
    assert_equal 2, Event.find_with_repeatings(@user, Time.local(2011, 7, 5),  Time.local(2011, 7, 9)).size
    assert_equal 3, Event.find_with_repeatings(@user, Time.local(2011, 7, 11), Time.local(2011, 7, 17)).size
    assert_equal 0, Event.find_with_repeatings(@user, Time.local(2011, 6, 11), Time.local(2011, 6, 17)).size
  end

  test "search regular events" do
    @user = User.create(:name => "User", :uid => 1, :provider => :google)

    @event_1 = @user.events.create(:title => "Event 1", :starts_on => Time.local(2011, 7, 6))

    assert_equal @event_1.starts_on.day, Time.local(2011, 7, 6).day
    assert @event_1.occurs_on?(Time.local(2011, 7, 6))
    assert_equal 1, Event.find_with_repeatings(@user, Time.local(2011, 7, 5),  Time.local(2011, 7, 9)).size

    @event_2 = @user.events.create(:title => "Event 1", :starts_on => Time.local(2011, 7, 4), :week_days => "5")
    assert_equal 5, Event.find_with_repeatings(@user, Time.local(2011, 7, 1),  Time.local(2011, 7, 31)).size
  end
end
