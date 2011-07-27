$(function() {
  var dialog = $("#add_event_dialog").append($("#event_form form").clone());
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
          $.post("/events", form.serialize(), function() {
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


  $("#add_event_button").click(function(e, event_id) {
    form[0].reset();
    form.data("event_id", null);
    dialog.dialog("open");

    return false;
  });
});
