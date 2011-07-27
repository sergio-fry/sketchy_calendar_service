class EventsController < InheritedResources::Base
  respond_to :html, :json
  before_filter :check_user

  # TODO: возможность добавить повторяющееся событие каждую неделю
  # TODO: возможность редактировать/удалить событие
  # TODO: не закрывать форму, если не удалось создать событие
  # TODO: обновить календарь после добавления события
  # TODO: всплывающий календарик для ввода даты
  # TODO: добавление события кликом на день
  
  def create
    @event = Event.new params[:event]
    @event.user = current_user
    create!
  end

  def index
    index! do |format|
      format.json { render :json => @events.map(&:to_hash) }
    end

  end

  private

  def check_user
    redirect_to root_path unless signed_in?
  end

  def collection
    @events ||= Event.find_with_repeatings(current_user, Time.at(params[:start].to_i), Time.at(params[:end].to_i)) 
  end

end
