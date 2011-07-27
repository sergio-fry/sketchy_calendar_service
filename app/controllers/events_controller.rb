class EventsController < InheritedResources::Base
  respond_to :html, :json

  # TODO: не закрывать форму, если не удалось создать событие
  # TODO: обновить календарь после добавления события
  # TODO: всплывающий календарик для ввода даты
  # TODO: добавление события кликом на день
  
  def create
    @event = Event.new params[:event]
    @event.user = current_user
    create!
  end

  private

  def collection
    @events ||= current_user.events.from_to(Time.at(params[:start].to_i), Time.at(params[:end].to_i)) 
  end
end
