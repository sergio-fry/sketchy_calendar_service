$(function(){
  $("#event_calendar").fullCalendar({
    eventSources: [
      function(start, end, callback){
        $.getJSON("/events.json", {start: (new Date(start)).getTime()/1000, end: (new Date(end)).getTime()/1000}, function(data) {

          var events = _.map(data, function(el) { 
            return {"title": el["event"].title, "start": (new Date(el["event"].starts_on)).getTime()/1000};
          });
          callback(events);
        });
      }
    ],
    firstDay: 1,
    header: {
      right: 'month,basicWeek,basicDay prev,next'
    }
  });
});
