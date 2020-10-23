const getMonthName = function(number) {
	let month

	switch(number) {
		case '01':
			month = 'january'
			break
		case '02':
			month = 'february'
			break
		case '03':
			month = 'march'
			break
		case '04':
			month = 'april'
			break
		case '05':
			month = 'may'
			break
		case '06':
			month = 'june'
			break
		case '07':
			month = 'july'
			break
		case '08':
			month = 'august'
			break
		case '09':
			month = 'september'
			break
		case '10':
			month = 'october'
			break
		case '11':
			month = 'november'
			break
		case '12':
			month = 'december'
			break
		default:
			month = 'unknown-month'
			break
	}

	return month
}

const capitalize = function(string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

const pipe = fns => x => fns.reduce((v, f) => f(v), x)

module.exports = {
  getMonthName,
  capitalize,
  pipe
}
