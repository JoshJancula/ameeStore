

  // Adding an event listener for when the form is submitted
  $("#submitButton").on('click', handleFormSubmit);
  var image; // convert the image to base64 so nodemailer can send it
  const input = document.getElementById("image");
  const reader = new FileReader;
  reader.onload = () => {
    const dataURL = reader.result;
    const base64 = reader.result.split(",").pop();
    image = base64;
  }
  input.onchange = () => {
    reader.abort();
    reader.readAsDataURL(input.files[0]);
  }

  // A function for handling what happens when the form to create a new message
  function handleFormSubmit(event) {

    var messageInput = $("#message").val().trim();
    var nameInput = $("#name").val().trim();
    // var imageInput = $("#image").val()
    var imageInput = document.getElementById('image');
    var emailInput = $("#email").val().trim();
    
    event.preventDefault();
    // Don't submit unless the form is complete
    if (!nameInput || !emailInput || !messageInput) {
      return;
    }
    // Constructing a newMessage
    var newMessage = {
      name: nameInput,
      email: emailInput,
      message: messageInput,
      attachments: [{
          filename: false,
          content: image
      }]
    
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
        attachments: message.attachments

      },
      function(data) {
        if (data == "sent") {
          console.log("Great Success!");
        }
      });
  }
