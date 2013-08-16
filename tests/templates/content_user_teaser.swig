<tr>
{% for key in user.keys() %}
	<td>{{ user.get(key) }}</td>
{% endfor %}
</tr>