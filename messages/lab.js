// Your JavaScript goes here...
function parse() {
	request = new XMLHttpRequest();

	request.open("GET", "data.json", true);

	request.onreadystatechange = function () {
		if(request.readyState == 4){
			result = "";
			raw = request.responseText;
			message = JSON.parse(raw);
			elem = getElementById("messages");
			for(i=0; i<message.length; i++){
				result += "<p> message["i+1"]["content"] + " " message[i]["i+1"] </p>"
			}
			elem.innerHTML = result;
		}
	};

	request.send(null); //no data to send
}