
if (typeof define !== 'function')
{
	var define = require('amdefine')(module);
}

define(['swig', '../lib/model/view', '../lib/model/node', '../lib/collection'], function(swig, View, Node, Collection) {

	return function(callback) {

		var Event = Node.extend({
			type: 'event',
			fields: {
				_type: 'event',
				title: { type: 'text' },
				location: { type: 'text' },
				start: { type: 'datetime' },
				end: { type: 'datetime' }
			},
			views: {
				web_single: new View({ format: 'html', source: '{{ node|json }}' }),
				web_teaser: new View({ format: 'html', source: '{{ node|json }}' }),
				calendar: new View({ format: 'ics', template: __dirname+'/templates/content_event_calendar.swig' })
			}
		});

		var EventCalendar = Collection.extend({
			type: 'list',
			filters: [],
			comparators: [],
			views: {
				json: new View({ format: 'json', source: '{{ collection|json }}'}),
				calendar: new View({ format: 'ics', template: __dirname+'/templates/collection_calendar.swig' })
			}
		});

		var events = new EventCalendar([
			new Event({ title: 'Title1', location: 'Location1', start: '2013-08-15T12:00:00Z', end: '2013-08-15T13:00:00Z' }),
			new Event({ title: 'Title2', location: 'Location2', start: '2013-08-16T12:00:00Z', end: '2013-08-16T13:00:00Z' }),
			new Event({ title: 'Title3', location: 'Location3', start: '2013-08-17T12:00:00Z', end: '2013-08-17T13:00:00Z' }),
			new Event({ title: 'Title4', location: 'Location4', start: '2013-08-18T12:00:00Z', end: '2013-08-18T13:00:00Z' })
		]);

		return callback(events.render('calendar'));
	};

});