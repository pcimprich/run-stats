// Auxiliary function for components 

const currentPeriodValues = (data, key) => {
	
	var values = {
			distance: 0,
			count: 0,
			duration: '0:00:00',
			maxDistance: 0,
			kcal: 0,
			elevation: 0
	};
	
	if (data[key]) {
		
		values = Object.assign({}, data[key], {
			duration: data[key].duration.replace(/^0/,'')
		});
	}
	return values;
}

module.exports.currentPeriodValues = currentPeriodValues;

