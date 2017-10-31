// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB9_caB4r1GqhfMBdBneTSOU9mOov4Hkr0",
    authDomain: "train-time-logger.firebaseapp.com",
    databaseURL: "https://train-time-logger.firebaseio.com",
    projectId: "train-time-logger",
    storageBucket: "",
    messagingSenderId: "126783609908"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// When user enters data, capture info and push to Firebase database
	function addTrain() {
		event.preventDefault();

		var name = $("#train-name").val().trim();
		var destination = $("#train-destination").val().trim();
		var startTime = $("#train-startTime").val().trim();
		var frequency = $("#train-frequency").val().trim();

		console.log(name, destination, startTime, frequency);

		$("#train-name").val("");
		$("#train-destination").val("");
		$("#train-startTime").val("");
		$("#train-frequency").val("");

		database.ref().push({
			name: name,
			destination: destination, 
			startTime: moment(startTime).format("x"),
			frequency: frequency
		});
	};

// When data changes in Firebase, pull data and populate table
	database.ref().on("value", function(snapshot) {
		var data = snapshot.val();

		console.log(data);

		$("#train-table-body").empty();

		for(var key in data) {
			var name = data[key].name;
			var destination = data[key].destination;
			var startTime = parseInt(data[key].startTime);
			var frequency = data[key].frequency;

			var tRow = $("<tr>");

			var tD1 = $("<td>").text(name);
			var tD2 = $("<td>").text(destination);
			var tD3 = $("<td>").text(moment(startTime).format("x"));
			var tD4 = $("<td>").text(frequency);
			// var tD5 = $("<td>").text(nextArrival); //Next train arrival
			//var tD6 = $("<td>").text(minutesAway); // minutes away

			$(tRow).append(tD1, tD2, tD3, tD4) //tD5, tD6)
			$("#train-table-body").append(tRow);
		


		}	



	});



$("#submit-train").click(function(event) {
	event.preventDefault();
	addTrain();
});
