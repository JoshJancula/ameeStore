var config = {
    apiKey: "AIzaSyBTiizpyWeqHfXdFDQsd6IoMdNWYvkceS8",
    authDomain: "amee-store.firebaseapp.com",
    databaseURL: "https://amee-store.firebaseio.com",
    projectId: "amee-store",
    storageBucket: "amee-store.appspot.com",
    messagingSenderId: "457253723299"
  };
  firebase.initializeApp(config);
  
  // Adding an event listener for when the form is submitted
  $("#submitButton").on('click', handleFormSubmit);
  var fileType;
  var fileName;
  var file;
  var downloadUrl;
  var acceptable = false;
  var validFileExtensions = ["image/jpg", "image/jpeg", "image/png", ""];
  var image; // convert the image to base64 so nodemailer can send it
  const input = document.getElementById("image");
  const reader = new FileReader;
  // when the file input changes...
  input.onchange = () => {
    reader.abort();
    reader.readAsDataURL(input.files[0]);
    file = input.files[0];
    fileType = file["type"];
    fileName = file.name
    checkType(fileType);
    console.log("fileType: " + fileType)
    console.log("fileName: " + fileName)
  }
  
  // A function for handling what happens when the form to create a new message
  function handleFormSubmit(event) {
    var messageInput = $("#message").val().trim();
    var nameInput = $("#name").val().trim();
    var emailInput = $("#email").val().trim();
    event.preventDefault();
    // Don't submit unless the form is complete
    if (!nameInput || !emailInput || !messageInput) {
      return;
    }  // if theres no image fileName is false
    else if (fileName == "" || fileName == null) {
        fileName == false;
        console.log("fileName: " + fileName)
     }// if the fileType is not acceptable
    else if (fileName != false && acceptable == false) {
        alert("FILE TYPE NOT SUPPORTED")
        return;
    } // Constructing a newMessage
    var newMessage = {
      name: nameInput,
      email: emailInput,
      message: messageInput,
    }; // submit the new comment
    uploadToFirebase(file, fileName, newMessage)
    
    // empty out the input fields
    $("#message").val("");
    $("#name").val("");
    $("#email").val("");
    $("#image").val("");
   
  }


  // Submits the message
  function submitMessage(message, downloadUrl) { // and send thme back to homepage
    console.log("about to send message");
    $.get("/send", {
        to: "josh@jancula.com",
        subject: "New Message",
        html: "<h4>" + "name: " + message.name + "</h4>" +
          "<ul>" +
          "<li>" + "email: " + message.email + "</li>" +
          "<li>" + "message: " + message.message + "</li>" +
          "<li>" + "imageURL: " + downloadUrl + "</li>" + "</ul>",
      },
      function(data) {
        if (data == "sent") {
          console.log("Great Success!");
        }
      });
  }


// checks the type of file user input
function checkType(fileType) {
    for (let i = 0; i < validFileExtensions.length; i++) {
        if (fileType === validFileExtensions[i]) {
            acceptable = true
        }
    }
}

// function submits image to firebase
function uploadToFirebase(file, fileName, newMessage) {
    var storageRef = firebase.storage().ref('/customerPhotos/' + fileName);
    var uploadTask = storageRef.put(file) // gets link to image
  uploadTask.on('state_changed', function(snapshot) {
  }, function(error) {
  }, function() { // sends that image with the emails
   downloadUrl = uploadTask.snapshot.downloadURL;
  console.log("downloadUrl: " + downloadUrl)
   submitMessage(newMessage, downloadUrl);
  })
}