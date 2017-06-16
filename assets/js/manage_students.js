(function(){

    
    // set up the data table attributes:
       $('#studentTable').DataTable({
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
       
    // set the validations for the create/update form
     let validator = $("#manageStudentForm").validate({
            errorClass: "text-danger bg-danger",
            rules: {
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
                }, 
                sat: {
                    required: true,
                    digits: true
                }
            },
            messages: {
                first_name: "Enter at least 2 characters for First Name",
                last_name: "Enter at least 2 characters for Last Name",
                start_date: "Enter a date in YYYY-MM-DD formate",
                sat: "Enter a numeric value for SAT score"
            }

        });
    
  //function to delete record by settin id on form and then submitting the form
  //sets value of student id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=student_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getStudent(record_id){
    return $.get("http://localhost:1337/student/" + record_id, function(data){
      console.log("got student");
    })
  }

  $(function(){

    //initialize variables for items in the DOM we will work with
    let manageStudentForm = $("#manageStudentForm");
    let addStudentButton = $("#addStudentButton");

    //add student button functionality
    addStudentButton.click(function(){
      manageStudentForm.attr("action", "/create_student");
      manageStudentForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            document.getElementById("manageStudentForm").reset();
            validator.resetForm();
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            //function to delete record
            manageStudentForm.submit()
          }
        }
      });
    })

  	$("#studentTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("studentid")
      manageStudentForm.find("input[name=student_id]").val(recordId);
      manageStudentForm.attr("action", "/update_student");
      let student = getStudent(recordId);

      //populate form when api call is done (after we get student to edit)
      student.done(function(data){
        $.each(data, function(name, val){
            var $el = $('[name="'+name+'"]');
            var type = $el.attr('type');
            if (name == 'major_id') {
                val = val.major_id;
            }
            switch(type){
                case 'checkbox':
                    $el.attr('checked', 'checked');
                    break;
                case 'radio':
                    $el.filter('[value="'+val+'"]').attr('checked', 'checked');
                    break;
                default:
                    $el.val(val).change();
            }
        });
      })

      manageStudentForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            document.getElementById("manageStudentForm").reset();
            validator.resetForm();
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            manageStudentForm.submit()
          }
        }
      });
    })


    $("#studentTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("studentid")
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete Student": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })

  })

})();
