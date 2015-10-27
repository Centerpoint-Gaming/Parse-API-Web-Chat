// Global variables
var currentUser;
var Messages = Parse.Object.extend("Messages");
 var now;

function attemptLogin() {
	now = new Date();
	$("#introDiv").slideToggle("slow", function() {
		$("#userform").toggle();

		// Changing intro text to display username
		$("#username").text("Greetings, " + currentUser.get("username") + ".");

		$("#messagediv").slideToggle("slow");
		$("#chatbox").text("");
	});
}

function attemptLogout() {
	Parse.User.logOut();
	currentUser = Parse.User.current();
	$("#messagediv").slideToggle("slow", function() {
		$("#userform").toggle();
		$("#introDiv").slideToggle("slow");
	})
}

function showRegisterForm() {
	$("#introDiv").slideToggle("slow", function() {
		$("#userform").toggle();
		$("#registerDiv").slideToggle("slow");
	});
}

function hideRegisterForm() {
	$("#registerDiv").slideToggle("slow", function() {
		$("#userform").toggle();
		$("#introDiv").slideToggle("slow");
	})	
}

window.setInterval(function(){
	if(currentUser !== null) {
		var oldscrollHeight = $("#chatbox").prop("scrollHeight");
		var query = new Parse.Query(Messages);
		query.greaterThan("createdAt", now);
		query.find({
			success: function(results) {
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					var timeString = "(" + object.createdAt.getHours() + ":" + object.createdAt.getMinutes() + ")";
					$("#chatbox").append("<div class=\"chatText\">" + timeString + " <b>" + object.get("sendUser") + ": </b>" + object.get("message") + "</div>");
				}

				if (results.length != 0)
					now = results[results.length - 1].createdAt;

				var newScrollHeight = $("#chatbox").prop("scrollHeight");
				if (newScrollHeight > oldscrollHeight) {
					$("#chatbox").animate({scrollTop: newScrollHeight}, 'normal');
				}


			},

			error: function(error) {
				alert("Error: " + error.code + " " + error.message + ".");
			}
		})
	}
}, 1000);


$(document).ready(function() {
	Parse.initialize("44OEfOguC36dEqCIdjfK24hYURF9AMPvWU5XYEa0", "1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p");
	currentUser = Parse.User.current();
	if (currentUser != null) { // There is a user logged in
		now = new Date();
		$("#userform").hide();
		$("#introDiv").hide();
		$("#username").text("Greetings, " + currentUser.get("username") + ".");
		$("#messagediv").slideToggle("slow");
		$("#chatbox").text("");
	}


	$("#showRegisterForm").click(showRegisterForm);
	$("#cancel").click(hideRegisterForm);

	$("#registerButton").click(function() {
		var regName = $("#regUsername").val().toString();
		var regPass = $("#regPassword").val().toString();
		if (regName === "" || regPass === "") {
			alert("Please fill in all credentials!");
		} else {
			var user = new Parse.User();
			user.set("username", regName);
			user.set("password", regPass);

			user.signUp(null, {
				success: function(user) {
					alert("Thanks for signing up!");
					hideRegisterForm();
				},

				error: function(user, error) {
					alert("Error: " + error.code + " " + error.message + ".");
				}
			});
		}
	});

	$("#loginButton").click(function() {
		var username = $("#usernameField").val().toString();
		var password = $("#passwordField").val().toString();

		Parse.User.logIn(username, password, {
			success: function(user) {
				
				currentUser = user;
				attemptLogin();
			},

			error: function(user, error) {
				alert("Error: " + error.code + " " + error.message + "."); 
			}
		});
	});

	$("#logoutButton").click(attemptLogout);

	$("#sendmsg").click(function() {
		var message = $("#usermsg").val().toString();
		var messageObject = new Messages();
		messageObject.save({message: message, sendUser:currentUser.get("username")}).then(function(object) {
			$("#usermsg").val("");
		});
	});

});
