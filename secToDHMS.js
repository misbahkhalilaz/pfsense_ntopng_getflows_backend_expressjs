toDDHHMMSS = function () {
	let sec_num = parseInt(this, 10);
	var days = Math.floor(sec_num / 3600 / 24);
	sec_num = sec_num - days * 24 * 3600;
	var hours = Math.floor(sec_num / 3600);
	sec_num = sec_num - hours * 3600;
	var minutes = Math.floor(sec_num / 60);
	sec_num = sec_num - minutes * 60;
	var seconds = sec_num;

	if (days < 10) {
		days <= 1 ? (days = "0" + days + "Day ") : (days = "0" + days + "Days ");
	} else days = days + "Days ";

	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	return days + hours + ":" + minutes + ":" + seconds;
};

module.exports = toDDHHMMSS;
