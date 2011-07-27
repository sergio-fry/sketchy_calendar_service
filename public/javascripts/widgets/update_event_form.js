$(function() {
  var dialog = $("#update_event_dialog").append($("#event_form form").clone());
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
          $.put("/events/"+form.data("event_id"), form.serialize(), function() {
            $.unblockUI();
            dialog.dialog("close");
            $('#event_calendar').fullCalendar('refetchEvents');
          });
        }

      },
      Destroy: function() {
        if(confirm("Are you sure?")) {
          $.blockUI();
          $.del("/events/"+form.data("event_id")+".json", form.serialize(), function() {
            $.unblockUI();
            dialog.dialog("close");
            $('#event_calendar').fullCalendar('refetchEvents');
          });
        }

      },
      Cancel: function() {
        $(this).dialog("close");
      }
    }
  });


  dialog.bind("show", function(e, event_id) {
    $.get("/events/"+event_id+".json", function(data) {
      form.find("#event_title").val(data["event"].title);
      form.find("#event_starts_on").val(data["event"].starts_on.substr(0, 10));
      form.find("#event_week_days").val(data["event"].week_days);
      form.find("#event_month_days").val(data["event"].month_days);
      form.data("event_id", event_id);
      dialog.dialog("open");
    });

    return false;
  });
});
