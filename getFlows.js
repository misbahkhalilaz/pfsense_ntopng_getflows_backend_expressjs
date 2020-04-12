const request = require("request");

function getFlows(user) {
	return new Promise((resolve, reject) => {
		var options = {
			method: "GET",
			url:
				"https://10.1.10.1:3000/lua/get_host_data.lua?host=" +
				user.ip.toString(),
			headers: {
				Authorization: "Basic dXNlcmFjYzowNDM4ODM5",
				Cookie: "session=",
			},
			rejectUnauthorized: false,
		};
		request(options, function (error, response) {
			if (error) throw new Error(error);
			var str = response.body.toString().split(",");
			var gotObj = JSON.parse(
				str[0] + "," + str[1] + "," + str[3] + "," + str[5].split("<")[0] + '"}'
			);
			let stats = {
				user: user,
				usage: {
					uptime: gotObj.column_since,
					data: gotObj.column_traffic,
					speed: gotObj.column_thpt,
				},
			};
			resolve(stats);
		});
	});
}

module.exports = getFlows;
