var React = require('react');
var RunStatsTabActivitiesList = require('../RunStatsTabActivitiesList').Component;
var renderer = require('react-test-renderer');

test('RunStatsTabActivitiesList renders a list of activities', () => {
  const runs = {
      	isFetching: false,
      	didInvalidate: false,
	  	lastUpdated: 1439478405547,
		filter: { key: 'yr.2017', count: 145 },
      	items: [
        	{"id":413,"date":"2017/02/21","year":2017,"month":2,"week":8,"time":"11:44:00","distance":10.47,"duration":"01:06:09","pace":"00:06:19","kcal":1000,"elevation":151,"cadence":79,"steps":10420,"location":"Radošovice","source":"Garmin","notes":null},
			{"id":415,"date":"2017/02/20","year":2017,"month":2,"week":8,"time":"24:25:00","distance":6.79,"duration":"00:40:58","pace":"00:06:02","kcal":664,"elevation":61,"cadence":78,"steps":6380,"location":"Radošovice","source":"Garmin","notes":null}
      	],
		groupedByWeek: {
			"2017w15": { count: 5, distance: 35, duration: '4:50:49', kcal: 7023, elevation: 957, maxDistance: 12.3 },
		},
		groupedByMonth: {
			"2017m1": { count: 14, distance: 95, duration: '16:50:49', kcal: 22023, elevation: 5357, maxDistance: 15.2 },
		},
		groupedByYear: {
			"2016": { count: 145, distance: 1067, duration: "108:20:10", elevation: 15886, kcal: 96988, maxDistance: 21.1 },
		},
		groupedTotal: { 
			total: { count: 445, distance: 3067, duration: "408:20:10", elevation: 35886, kcal: 426988, maxDistance: 21.1 }
		},
		isImporting: false,
		lastImported: 1239478406530,
		newActivities: 0,
		showImportModal: false
	};
	
  const component = renderer.create(
	<RunStatsTabActivitiesList runs={runs} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

