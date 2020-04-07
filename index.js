const request = require("request");
String.prototype.toDDHHMMSS = require("./secToDHMS");
const express = require("express");
const app = express();
var cors = require("cors");
const getUser = require("./getUser");
const btoa = require("btoa");

var ntop_server_ip = "192.168.1.1:3000"; //ntopip:port here
var interface_id = "0"; //interface id here
var auth = "Basic " + btoa("username:pass"); // add your credentials
app.use(cors());

app.get("/:nic", (reqp, respp) => {
	var user = getUser(reqp.params.nic);
	if (!user) {
		respp.send({
			error: "plz enter your registered valid nic number.", // return this if user id not found
		});
	} else {
		var options = {
			method: "GET",
			url:
				"https://" +
				ntop_server_ip +
				"/lua/host_get_json.lua?ifid=" +
				interface_id +
				"&host=" +
				user.ip.toString(),
			headers: {
				Authorization: auth,
				Cookie: "session=",
			},
			rejectUnauthorized: false,
		};
		request(options, function (error, response) {
			if (error) throw new Error(error);
			let gotObj = JSON.parse(response.body);
			let stats = {
				user: user,
				host: {
					ip: gotObj.ip.ip,
					mac: gotObj.mac_address,
				},
				data: {
					upload: gotObj.sent.bytes,
					download: gotObj.rcvd.bytes,
				},
				bandwidth: gotObj.throughput_bps / 1000,
				active_time: gotObj.total_activity_time.toString().toDDHHMMSS(),
			};
			console.log(stats);
			respp.send(stats);
		});
	}
});

app.listen(5000, (req, res) => console.log("started, localhost:5000/nic"));
