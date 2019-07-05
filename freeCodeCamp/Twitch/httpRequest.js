
window.onload(function () {
	console.log("beginning");
		var url,       //link to get data from server
			httpRequest;   //initializing an http request object

			url = "https://api.twitch.tv/kraken/streams?game=StarCraft+II%3A+Heart+of+the+Swarm&channel=test_channel,test_channel2";

		function makeRequest(url) {
			httpRequest = new XMLHttpRequest();             //initializing an http request object

			if (!httpRequest) {
				console.log("can not get data");
				return false;
			}
			httpRequest.onreadystatechange = useResponse;    //what should happen when response is gotten from the server
			httpRequest.open('GET', url);
			httpRequest.send();
		}

			function useResponse() {			
					if (httpRequest.readyState === XMLHttpRequest.DONE) {
						if (httpRequest.status === 200) {
							console.log("working");
						}
					} else {
						console.log("still on it");
					}

				
				};


	
		});


		