var myLat = 0;
var myLng = 0;
var request =  new XMLHttpRequest();
var myLocation = new google.maps.LatLng(myLat, myLng);
var map;
var marker;
var infoWindow = new google.maps.InfoWindow();
var mapOptions = {
	zoom: 15,
	center: myLocation,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};
var person_icon = {
    		url: "person.png",
    		scaledSize: new google.maps.Size(30, 30)
};
var landmark_icon = {
	url: "landmark.png",
	scaledSize: new google.maps.Size(30, 30)
};

var objLat = 0;
var objLng = 0;
var dist = 0;

function initMap()
{
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	getMyLocation();
}

function getMyLocation()
{
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.");
	}
}

function renderMap()
{
	myLocation = new google.maps.LatLng(myLat, myLng);
	map.panTo(myLocation); //got to self

	addPeopleLandmarks();
}

function addPeopleLandmarks()
{
	var request = new XMLHttpRequest();
	//http://polar-tor-46518.herokuapp.com/sendLocation
	request.open("POST", "http://polar-tor-46518.herokuapp.com/sendLocation", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200)
		{
			raw = request.responseText;
			locations = JSON.parse(raw);

			for(i=0; i<locations["people"].length; i++) { //other students
				objLat = locations["people"][i]["lat"];
				objLng = locations["people"][i]["lng"];
				person_location = new google.maps.LatLng(objLat, objLng);
				computeDistance();
				if(dist <= 1) { //only ppl w/i a mile of me
					person_marker = new google.maps.Marker({
						position: person_location,
						title: locations["people"][i]["login"],
						icon: person_icon,
						content: "<p>"+locations["people"][i]["login"]+"<br>Distance from me: "
									+dist+" mi</p>"
					});
					
					if(objLat != myLat && objLng != myLng) {
						person_marker.setMap(map);
						google.maps.event.addListener(person_marker, 'click', function(){
							infoWindow.setContent(this.content);
							infoWindow.open(map, this);
						});
					}
				}
			}
			
			for(i=0; i<locations["landmarks"].length; i++) { //landmarks
				objLat = locations["landmarks"][i]["geometry"]["coordinates"][1];
				objLng = locations["landmarks"][i]["geometry"]["coordinates"][0];
				landmark_location = new google.maps.LatLng(objLat, objLng);
				landmark_marker = new google.maps.Marker({
					position: landmark_location,
					title: locations["landmarks"][i]["properties"]["Location_Name"],
					icon: landmark_icon,
					content: "<p>"+locations["landmarks"][i]["properties"]["Details"]+"</p>"
				});

				landmark_marker.setMap(map);
				google.maps.event.addListener(landmark_marker, 'click', function(){
					infoWindow.setContent(this.content);
					infoWindow.open(map, this);
				});

				if(i == 0) { //the first land mark is the closest
					drawPolyline();
					computeDistance();
					//create marker for self with closest landmark
					marker = new google.maps.Marker({
						position: myLocation,
						title: "KIRSTEN_MELTON",
						content: "<p>I am KIRSTEN_MELTON<br>Closest Landmark: "+landmark_marker.title+
								"<br>Distance Away to Landmark: "+dist+" mi</p>"
					});
					marker.setMap(map);

					google.maps.event.addListener(marker, 'click', function(){
						infoWindow.setContent(this.content);
						infoWindow.open(map, this);
					});
				}
			}

		}
	};
		//request.send("login=J_NAGY&lat="+myLat+"&lng="+myLng);
		request.send("login=KIRSTEN_MELTON&lat="+myLat+"&lng="+myLng);
		//KIRSTEN_MELTON
};

function computeDistance() 
{
	//Haversine Formula
	Number.prototype.toRad = function() {
   return this * Math.PI / 180;
	}

	var lat2 = myLat; 
	var lon2 = myLng; 
	var lat1 = objLat; 
	var lon1 = objLng; 

	var R = 6371; // km 
	var x1 = lat2-lat1;
	var dLat = x1.toRad();  
	var x2 = lon2-lon1;
	var dLon = x2.toRad();  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
	                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
	                Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; 

	dist = d*0.621371; //convert to miles
}

function drawPolyline() 
{
	var polyCoord = [
		{lat: myLat, lng: myLng},
		{lat: objLat, lng: objLng}
	];
	var polyline = new google.maps.Polyline({
		path: polyCoord,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeigth: 2
	});
	polyline.setMap(map);
}


