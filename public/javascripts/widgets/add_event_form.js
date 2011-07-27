$(function() {
  var dialog = $("#add_event_dialog");
  var form = dialog.find("form");

  dialog.dialog({
			autoOpen: false,
			height: 300,
			h: 350,
			modal: true,
			buttons: {
        "Create an event": function() {
          var valid = true;
          form.find(":input").each(function() {
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
            });
          }

				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}
    });


  $("#add_event_button").click(function() {
    dialog.dialog("open");
    return false;
  });
});