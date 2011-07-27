class UsersController < InheritedResources::Base
  def create
    if data = Loginza.user_data(params[:token])
      user = User.find_or_create(data)
      cookies[:user_id] = user.id

      redirect_to events_path
    else
      redirect_to root_path
    end
  end

  def logout
    cookies[:user_id] = nil
    redirect_to root_path
  end
end
