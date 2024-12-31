{%- set token = get_env(name="GITHUB_TOKEN", default="") %}
{%- for repo_name in page.extra.repo_names %}
  {%- set url = "https://api.github.com/repos/" ~ config.extra.github.username ~ "/" ~ repo_name %}
  {%- if token %}
    {%- set repository = load_data(url=url, format="json", headers=["Authorization=Bearer " ~ token]) %}
  {%- else %}
    {%- set repository = load_data(url=url, format="json") %}
  {%- endif %}
  {%- if repository %}
  * [{{ repository.name }}]({{ repository.html_url }})<br>{{ repository.description }}<br><br>
  {%- endif %}
{%- endfor %}
