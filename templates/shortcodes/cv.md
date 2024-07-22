{%- set cv_education = load_data(path="data/cv/education.yml") -%}
{%- set cv_summary = load_data(path="data/cv/summary.yml") -%}
{%- set cv_experience = load_data(path="data/cv/experience.yml") | sort(attribute="start_date") | reverse -%}
{%- set cv_projects = load_data(path="data/cv/projects.yml") | sort(attribute="start_date") | reverse -%}
{%- set cv_skills = load_data(path="data/cv/skills.yml") -%}
<div class="cv">
  {%- if config.extra.cv_file %}
  <p class="cv-btn">
    <a href="{{ get_url(path=config.extra.cv_file) | safe }}" class="btn">Download as .pdf</a>
  </p>
  {%- endif %}

  ## Summary

  {% for punct in cv_summary %}
  - {{ punct }}{% endfor %}

  ## Skills Summary

  | Category     | Skills               |
  |-------------:|:---------------------|
  {% for skill in cv_skills %}| **{{ skill.type }}** | {% for tool in skill.tools %}{{ tool }}{% if not loop.last %}, {% endif %}{% endfor %} |  
  {% endfor %}

  ## Experience

  <div class="cv-experience">
  {% set previous_employer="" %}
  {% for exp in cv_experience %}

  {% if exp.employer != previous_employer %}
  ### {{ exp.employer }} · {{exp.location}}
  {% endif %}

  #### {{ exp.title }}

  <div><time datetime="{{ exp.start_date | date(format="%Y-%m-%dT%H:%M:%S%:z") }}" class="smaller">{{ exp.start_date | date(format="%B %Y") }}{% if exp.start_date != exp.end_date %} &mdash; {% if exp.end_date %}{{ exp.end_date | date(format="%B %Y") }}{% else %}Present{% endif %}{% endif %}</time></div>
  {% for duty in exp.responsibilities %}
  - {{ duty }}{% endfor %}
  {% set_global previous_employer=exp.employer %}
  {% endfor %}
  </div>

  ## Personal Projects

  <div class="cv-projects">
  {% for project in cv_projects %}

  ### {{ project.name }}{% if project.link %} · [{{ project.link.text }}]({{ project.link.url }}){% endif %}

  #### Used: {{ project.technologies | join(sep=", ") }}

  <div><time datetime="{{ project.start_date | date(format="%Y-%m-%dT%H:%M:%S%:z") }}" class="smaller">{{ project.start_date | date(format="%B %Y") }}{% if project.start_date != project.end_date %} &mdash; {% if project.end_date %}{{ project.end_date | date(format="%B %Y") }}{% else %}Present{% endif %}{% endif %}</time></div>

  {{ project.desc }}

  {% endfor %}
  </div>

  ## Education

  <div class="cv-education">
  {% for degree in cv_education %}

  ### {{ degree.school }}

  #### {{ degree.degree }}

  <div><time datetime="{{ degree.date | date(format="%Y-%m-%dT%H:%M:%S%:z") }}" class="smaller">{{ degree.date | date(format="%B %Y") }}</time></div>
  {% endfor %}
  </div>
</div>
