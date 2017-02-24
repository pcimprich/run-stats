// Function to filter the list of runs

const runFilter = (run, filter) => {
	const [type, value] = filter.split(':',2);
	
	switch (type) {
		case 'yr':
			return run.year == value ? 1 : 0
		case 'km':
			return run.distance >= value ? 1 : 0
		default:
			return 1
	}
}

module.exports.runFilter = runFilter;