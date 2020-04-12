const getFlows = require("./getFlows");
const express = require("express");
const app = express();
var cors = require("cors");
const getUser = require("./getUser");

app.use(cors());

app.get("/:nic", (reqp, respp) => {
	var user = getUser(reqp.params.nic);
	if (!user) {
		respp.send({
			error: "plz enter your registered valid nic number.",
		});
	} else {
		getFlows(user).then((stats) => {
			console.log(stats);
			respp.send(stats);
		});
	}
});

app.listen(5000, (req, res) => console.log("started, localhost:5000/nic"));
