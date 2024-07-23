
{%- set url = "https://api.github.com/users/" ~ config.extra.github.username ~ "/repos" %}
{%- set public_repositories = load_data(url=url, format="json") %}
{%- for repo_name in page.extra.repo_names %}
  {%- set repository = public_repositories | filter(attribute="name", value=repo_name) | first %}
  * [{{ repository.name }}]({{ repository.html_url }})<br>{{ repository.description }}<br><br>
{%- endfor %}