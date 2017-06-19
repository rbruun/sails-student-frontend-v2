(function(){


       
    // set the validations for the create/update form
     let validator = $("#manageModelForm").validate({
            errorClass: "text-danger bg-danger",
            rules: {
                grade: {
                    required: true,
                    minlength: 2
                },
                last_name: {
                    required: true,
                    minlength: 2
                },
                first_name: {
                    required: true,
                    minlength: 2
                },
                start_date: {
                    dateISO: true
                }
            },
            messages: {
                grade: "Enter at least 2 characters for grade description",
            }

        });
    
  //function to delete record by settin id on form and then submitting the form
  //sets value of student id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id, modelName){
    $("#deleteform input[name=" + modelName + "_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getModel(record_id, modelName){
    return $.get("http://localhost:1337/" + modelName + "/" + record_id, function(data){
    })
  }

  $(function(){
      
          
    // set up the data table attributes:
       $('#modelTable').DataTable({
        colReorder: true,
        "scrollX": true,
        dom: 'Bfrtlip',
           
        buttons: [
            'copy',
            'excel',
            'csv',
            'pdf',
            'print'
        ]

    });

    //initialize variables for items in the DOM we will work with
    let manageModelForm = $("#manageModelForm");
    let addModelButton = $("#addModelButton");


    //add student button functionality

    addModelButton.click(function(){       
      let modelName = $(this).data("model");
      manageModelForm.attr("action", "/create_" + modelName);
      manageModelForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            document.getElementById("manageModelForm").reset();
            validator.resetForm();
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            //function to delete record
            manageModelForm.submit()
          }
        }
      });
    })

  	$("#modelTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("modelid");
        let modelName = $(this).data("model");
      manageModelForm.find("input[name=" + modelName + "_id]").val(recordId);
      manageModelForm.attr("action", "/update_" + modelName);
      let model = getModel(recordId, modelName);

      //populate form when api call is done (after we get record to edit)
      model.done(function(data){
        $.each(data, function(name, val){
            var $el = $('[name="'+name+'"]');
            // if the id field is linked to a model object, then get id from the related model
            if (jQuery.type(val) == 'object') {           
                var temp = val[name];    
                val = temp;                 
            }
            var type = $el.attr('type');
            switch(type){
                case 'checkbox':
                    if (val) {
                        $el.attr('checked', 'checked');
                    }
                    break;
                case 'radio':
                    $el.filter('[value="'+val+'"]').attr('checked', 'checked');
                    break;
                default:
                    $el.val(val).change();
            }
        });
      })

      manageModelForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            document.getElementById("manageModelForm").reset();
            validator.resetForm();
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            manageModelForm.submit()
          }
        }
      });
    })


    $("#modelTable").on("click", "#deleteButton", function(e){    
      let recordId = $(this).data("modelid");
        let modelName = $(this).data("model");
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete Record": function() {
            //function to delete record
            deleteRecord(recordId, modelName);
          }
        }
      });
    })

  })

})();
