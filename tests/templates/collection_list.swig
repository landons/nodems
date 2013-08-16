{% extends '../layouts/html5.swig' %}

{% block content %}

<h1>{% block title %}{{ title|default("Collection List") }}{% endblock %}</h1>

<table>
	<tbody>
	{% for item in collection %}
		{{ item.render('teaser') }}
	{% endfor %}
	</tbody>
</table>

{% endblock %}