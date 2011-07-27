$(function(){
  $("#event_calendar").fullCalendar({
    eventSources: [
      function(start, end, callback){
        $.getJSON("/events.json", {start: (new Date(start)).getTime()/1000, end: (new Date(end)).getTime()/1000}, function(data) {

          var events = _.map(data, function(el) { 
            return {"title": el["event"].title, "start": el["event"].starts_on};
          });
          callback(events);
        });
      }
    ],
    header: {
      right: 'month,basicWeek,basicDay prev,next'
    }
  });
});
