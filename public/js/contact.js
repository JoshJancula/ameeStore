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
var input = document.getElementById("image");
var reader = new FileReader;

// when the file input changes...
input.onchange = () => {
  reader.abort();
  reader.readAsDataURL(input.files[0]);
  file = input.files[0];
  fileType = file["type"];
  fileName = file.name
  checkType(fileType);
}

// function to create a new message
function handleFormSubmit(event) {
  var messageInput = $("#message").val().trim();
  var nameInput = $("#name").val().trim();
  var emailInput = $("#email").val().trim();
  var newMessage = {
    name: nameInput,
    email: emailInput,
    message: messageInput,
  };

  event.preventDefault();
  // Don't submit unless the form is complete
  if (!nameInput || !emailInput || !messageInput) {
    alert("Please complete the form.")
    return;
  } // if file type is not supported
  else if (fileName != undefined && acceptable == false) {
    alert("FILE TYPE NOT SUPPORTED")
    return;
  } // if there is no file just submit message
  else if (fileName == undefined && acceptable == false) {
    submitMessage(newMessage)
    // clear fields
    $("#message").val("");
    $("#name").val("");
    $("#email").val("");
    $("#image").val("");
    $("#contactModal").modal("hide");
  }
  else { // if there is a file to submit
    uploadToFirebase(file, fileName, newMessage)
    // clear fields
    $("#message").val("");
    $("#name").val("");
    $("#email").val("");
    $("#image").val("");
    $("#contactModal").modal("hide");
  }
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
function uploadToFirebase(file, fileName, newMessage) {// submit image
  var storageRef = firebase.storage().ref('/customerPhotos/' + fileName);
  var uploadTask = storageRef.put(file) // gets link to image
  uploadTask.on('state_changed', function(snapshot) {}, function(error) {}, function() {
    downloadUrl = uploadTask.snapshot.downloadURL;
     // sends the image url with the emails
    submitMessage(newMessage, downloadUrl);
  })
}
