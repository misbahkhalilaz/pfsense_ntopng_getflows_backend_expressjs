const users = {
	// add users data.
	"user1_id here": {
		name: "user name here",
		ip: "ip here",
		pkg: "pkg details here like: 8mbps_250gb",
		pre_dues: "for billing",
		current_bill: "for billing",
		bill_status: "Paid or unpaid",
	},
	"user2_id here": {
		name: "user name here",
		ip: "ip here",
		pkg: "pkg details here like: 8mbps_250gb",
		pre_dues: "for billing",
		current_bill: "for billing",
		bill_status: "Paid or unpaid",
	},
};

function getUser(nic) {
	//return host ip against each userid in users obj
	if (nic in users) {
		return users[nic];
	}
	return false;
}

module.exports = getUser;
