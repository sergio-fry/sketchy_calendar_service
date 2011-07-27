$(function() {
  var dialog = $("#add_event_dialog");
  var form = dialog.find("form");

  dialog.dialog({
			autoOpen: false,
			height: 420,
			h: 350,
			modal: true,
			buttons: {
        Save: function() {
          var valid = true;
          form.find(".required").each(function() {
            if($(this).val() === "") {
              $(this).focus();
              valid = false;
            }
          });

          if(valid) {
            $.blockUI();
            if(!form.data("event_id")) {
              $.post("/events", form.serialize(), function() {
                $.unblockUI();
                dialog.dialog("close");
                $('#event_calendar').fullCalendar('refetchEvents');
              });
            } else {
              $.put("/events/"+form.data("event_id"), form.serialize(), function() {
                $.unblockUI();
                dialog.dialog("close");
                $('#event_calendar').fullCalendar('refetchEvents');
              });

            }
          }

				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}
    });


  $("#add_event_button").click(function(e, event_id) {
    if(event_id !== undefined){
      $.get("/events/"+event_id+".json", function(data) {
        form.find("#event_title").val(data["event"].title);
        form.find("#event_starts_on").val(data["event"].starts_on.substr(0, 10));
        form.find("#event_week_days").val(data["event"].week_days);
        form.find("#event_month_days").val(data["event"].month_days);
        form.data("event_id", event_id);
        dialog.dialog("open");
      });
    } else {
      form[0].reset();
      form.data("event_id", null);
      dialog.dialog("open");
    }

    return false;
  });
});
