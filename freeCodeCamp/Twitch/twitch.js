var userName = ["ESL_SC2", "comster404", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "Lumexralph", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];
var j = 0,
	name,
	content,
	channel,
	logo;

	var today = new Date();
	var year = today.getUTCFullYear();


$(function() {


		for (var i = 0; i < userName.length; i++) {
		
			$.ajax({
 				method: 'GET',
 				async: false,
 				url: 'https://api.twitch.tv/kraken/streams/' + userName[i],
 				headers: {
   				'Client-ID': 'f98menyny9svya71r2daxk8e8su0vgb'
 					}, 				
				})
				.done(function (data) {
						name = userName[j];						
						displayAllUser(name);  //display all streamers

						if (data.stream) {						
							logo = data["stream"]["channel"]["logo"];
							content = data["stream"]["channel"]["status"];
							channel = data["stream"]["channel"]["url"];

							online(name, logo, content, channel);
							//console.log(data);

							j++;					
						}
						else {
							$.ajax({
 								method: 'GET',
 								async: false,
 								url: 'https://api.twitch.tv/kraken/channels/' + name,
 								headers: {
   								'Client-ID': 'f98menyny9svya71r2daxk8e8su0vgb'
 									}, 				
						})
							.done(function (data) {
								logo = data["logo"];
								channel = data["url"];

								offline(name, logo, channel);    //when the users are offline
								console.log("offline");
								})
							
							j++;
						}
						
					})
				.fail(function () {
					    //removeDom(userName[j]);             //need it to clear the loaded dom for update
						displayAllUser(userName[j]);
						userNotAvailable(userName[j]);
						j++;
					});
				}


		function displayAllUser(name) {
			    $('#displayStreamers').append('<div id=' + name + ' class="col-xs-12 col-md-12"><div class="user">' + name + '</div><div class="status"></div></div>');
			    }



		function online(name, logo, content, channel) {
			$('#' + name).replaceWith('<div id=' + name + ' class="col-xs-12 col-md-12"><img src="' + logo + '"alt="User Logo" class="img-circle" style="width:80px;height:80px;"><div class="user">' + name + '</div><div id="onlineLogo"></div><span class="live">Live </span>| <a target=_blank href="' + channel + '"><p>'
				 + content + '</p></a></div>');
		}

		function offline(name, logo, channel) {

				$('#' + name)
				.replaceWith('<div id=' + name + ' class="col-xs-12 col-md-12" ><img src="' + logo + '"alt="User Logo" class="img-circle" style="width:80px;height:80px;"><div class="user">' + name +'</div><div class="statusOffline"></div><strong>Offline </strong><a target =_blank href=' + channel + '>View the channel</a></div>');
			}	

		function userNotAvailable(name) {
			$('<p>Username does not exist / account closed</p>').appendTo('#' + name);
		}

		$('footer').append('<p><b>COPYRIGHT &copy ' + year + '</b></p>')
		
	});

		