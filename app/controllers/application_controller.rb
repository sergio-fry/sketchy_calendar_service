class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :signed_in?, :current_user

  private

  def current_user
    User.find_by_id(cookies[:user_id])
  end

  def signed_in?
    current_user.present?
  end
end
