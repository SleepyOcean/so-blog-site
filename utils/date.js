let dateFormat = {};
dateFormat.FORMAT = {
	YYYYMMMDDHHMMSS: "yyyy-MM-dd hh:mm:ss",
	YYYYMMMDDHHMM: "yyyy-MM-dd hh:mm",
	YYYYMMDD: "yyyy-MM-dd"
};
function padLeftZero(str) {
	return ("00" + str).substr(str.length);
}

//  字符串转日期
dateFormat.simpleToDate = function(value) {
	var array = value.split(" ");
	var yymmdd = array[0].split("-");
	var hhmmss = array[1].split(":");
	var date = new Date(
		yymmdd[0],
		yymmdd[1],
		yymmdd[2],
		hhmmss[0],
		hhmmss[1],
		hhmmss[2]
	);
	return date;
};

dateFormat.formatDate = function(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(
			RegExp.$1,
			(date.getFullYear() + "").substr(4 - RegExp.$1.length)
		);
	}
	let o = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + "";
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length === 1 ? str : padLeftZero(str)
			);
		}
	}
	return fmt;
};
dateFormat.formatDateWithRange = function(date, fmt, size) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(
			RegExp.$1,
			(date.getFullYear() + "").substr(4 - RegExp.$1.length)
		);
	}
	let o = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate() + size,
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + "";
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length === 1 ? str : padLeftZero(str)
			);
		}
	}
	return fmt;
};

dateFormat.formatDateSlim = function(dateStr) {
	if (dateStr === null) {
		return '-';
	}
	let s = dateStr.substring(0, 10).split("-");
	return s[0] + "." + s[1] + "." + s[2];
};

//  格式化结果：20190411080000 to 2019-04-11 08:00:00
dateFormat.formatString = function(date) {
	return (
		date.substring(0, 4) +
		"-" +
		date.substring(4, 6) +
		"-" +
		date.substring(6, 8) +
		" " +
		date.substring(8, 10) +
		":" +
		date.substring(10, 12) +
		":" +
		date.substring(12, 14)
	);
};

//  格式化结果：2019-04-11 08:00:00 to 20190411080000
dateFormat.formatToString = function(date) {
	return (
		date.substring(0, 4) +
		date.substring(5, 7) +
		date.substring(8, 10) +
		date.substring(11, 13) +
		date.substring(14, 16) +
		date.substring(17, 19)
	);
};

dateFormat.getTimeBeforeDaysFromNow = function(day) {
	var now = new Date();
	var before = new Date();

	// 获取当前时间的毫秒数
	var nowMilliSeconds = now.getTime();
	// 用获取当前时间的毫秒数减去x天的毫秒数，赋值给before对象（一天有86400000毫秒）
	before.setTime(nowMilliSeconds - day * 86400000);
	return dateFormat.formatDate(before, "yyyy-MM-dd hh:mm:ss");
};

dateFormat.getTimeBeforeYearsFromNow = function(year) {
	var now = new Date();
	var before = new Date();
	before.setFullYear(now.getFullYear() - year);
	return dateFormat.formatDate(before, "yyyy-MM-dd hh:mm:ss");
};

// 获取当前时间，格式YYYY-MM-DD
dateFormat.getNowFormatDate = function() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
};

dateFormat.getTimeRemaining = function(startDateStr, endDateStr) {
	let startDate = new Date(startDateStr);
	let endDate = new Date(endDateStr);
	let diffval = parseInt((startDate - endDate) / 1000 / 60 / 60 / 24);
	return diffval;
};

export default dateFormat;
