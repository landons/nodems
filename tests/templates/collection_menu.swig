<ul>
	<li>
		<a href="{{ uri }}">{{ title }}</a>
		{% for item in collection %}
			{{ item|json }}
			{% if item.render %}
				Yay!
			{% endif %}
		{% endfor %}
	</li>
</ul>