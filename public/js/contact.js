

  // Adding an event listener for when the form is submitted
  $("#submitButton").on('click', handleFormSubmit);

  // A function for handling what happens when the form to create a new message
  function handleFormSubmit(event) {

    var messageInput = $("#message").val().trim();
    var nameInput = $("#name").val().trim();
    // var imageInput = $("#image").val()
    var imageInput = document.getElementById('image');
    var emailInput = $("#email").val().trim();
    var file;
    
    imageInput.addEventListener('change', function(e) {
     file = e.target.files[0];
    });
    event.preventDefault();
    // Don't submit unless the form is complete...... they don't have to give phone#
    if (!nameInput || !emailInput || !messageInput) {
      return;
    }
    // Constructing a newMessage
    var newMessage = {
      name: nameInput,
      email: emailInput,
      message: messageInput,
      attachments: file
    
    }; // submit the new comment
   
    submitMessage(newMessage);

    // empty out the input fields
    $("#message").val("");
    $("#name").val("");
    $("#email").val("");
    $("#image").val("");
   
  }


  // Submits the message
  function submitMessage(message) { // and send thme back to homepage
    console.log("about to send message");
    $.get("/send", {
        to: "josh@jancula.com",
        subject: "New Message",
        html: "<h3>" + "name: " + message.name + "</h3>" + "<br>" +
          "<h4>" + "email: " + message.email + "</h4>" +
          "<p>" + "message: " + message.message + "</p>",
        attachments: [{
            filename: false,
            content: message.file
        }]

      },
      function(data) {
        if (data == "sent") {
          console.log("Great Success!");
        }
      });
  }
