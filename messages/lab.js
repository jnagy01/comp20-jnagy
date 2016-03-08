request = new XMLHttpRequest();

function parse() {

	request.open("GET", "data.json", true);

	request.onreadystatechange = function () {
		if(request.readyState == 4 && request.status == 200){
			result = "";
			raw = request.responseText;
			message = JSON.parse(raw);
			elem = document.getElementById("messages");
			for(i=0; i<message.length; i++){
				result += "<p>" + message[i]["content"] + " " + message[i]["username"] + "</p>";
			}
			elem.innerHTML = result;
		}
	};

	request.send(null); //no data to send
}
