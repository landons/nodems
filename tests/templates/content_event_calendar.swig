BEGIN:VEVENT
UID:{{ event.cid }}
{% if (event.has('organizer')) %}
ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com
{% endif -%}
DTSTAMP:{{ event.date('start', 'YYYYMMDD[T]HHmmss[Z]') }}
DTSTART:{{ event.date('start', 'YYYYMMDD[T]HHmmss[Z]') }}
DTEND:{{ event.date('end', 'YYYYMMDD[T]HHmmss[Z]') }}
SUMMARY:{{ event.get('title') }}
END:VEVENT