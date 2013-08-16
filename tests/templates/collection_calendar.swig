BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NodeMS/CMS//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
{%- for event in collection %}
{{ event.render('calendar') }}
{%- endfor %}
END:VCALENDAR