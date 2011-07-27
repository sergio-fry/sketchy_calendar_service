$(function(){
  $("#event_calendar").fullCalendar({
    eventSources: [
      function(start, end, callback){
        $.getJSON("/events.json", {start: (new Date(start)).getTime()/1000, end: (new Date(end)).getTime()/1000}, function(data) {

          var events = _.map(data, function(el) { 
            return {"id": el.base_id, "title": el.title, "start": (new Date(el.starts_on)).getTime()/1000};
          });
          callback(events);
        });
      }
    ],
    firstDay: 1,
    header: {
      right: 'month,basicWeek,basicDay prev,next'
    },
    eventClick: function(calEvent, jsEvent, view) {
      $("#update_event_dialog").trigger("show", calEvent.id);
    },
    dayClick: function(date, allDay, jsEvent, view) {
      $("#add_event_dialog").trigger("show", date);
    }
  });
});
