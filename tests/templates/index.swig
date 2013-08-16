{% extends '../layouts/html5.swig' %}

{% block content %}
<h1>{% block title %}Test Suite{% endblock %}</h1>

<dl>
{% for group in groups %}
	<dt>{{ loop.key|title }}</dt>
	{% for item in group %}
		<dd><a href="{{ loop.key }}">{{ item }}</a></dd>
	{% endfor %}
{% endfor %}
</dl>

{% endblock %}