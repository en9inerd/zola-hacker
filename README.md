# Hacker theme for Zola

Zola Hacker is a minimalistic theme for Zola, inspired by the [Hacker theme](https://pages-themes.github.io/hacker/) for Jekyll. It is designed for developers who want to write blogs.

## Demo

[Live Preview](https://zola-hacker.enginerd.io/).

## Requirements

Before using the theme, you need to install the [Zola](https://www.getzola.org/documentation/getting-started/installation/) ≥ 0.19.1.

## Quick Start

```bash
git clone https://github.com/en9inerd/zola-hacker.git
cd zola-hacker
zola serve
# open http://127.0.0.1:1111/ in the browser
```

## Installation

Just earlier we showed you how to run the theme directly. Now we start to
install the theme in an existing site step by step.

### Step 1: Create a new zola site

```bash
zola init mysite
```

### Step 2: Install Zola Hacker Theme

Download this theme to your themes directory:

```bash
cd mysite/themes
git clone https://github.com/en9inerd/zola-hacker.git
```

Or install as a submodule:

```bash
cd mysite
git init  # if your project is a git repository already, ignore this command
git submodule add https://github.com/en9inerd/zola-hacker.git themes/hacker
```

### Step 3: Configuration

Enable the theme in your `config.toml` in the site directory:

```toml
theme = "hacker"
```

Or copy the `config.toml` from the theme directory to your project's
root directory:

```bash
cp themes/hacker/config.toml config.toml
```

### Step 4: Add new content

You can copy the content from the theme directory to your project:

```bash
cp -r themes/hacker/content .
```

You can modify or add new posts in the `content/posts`, `content/pages` or other
content directories as needed.

### Step 5: Run the project

Just run `zola serve` in the root path of the project:

```bash
zola serve
```

Command will start the Zola development web server accessible by default at
`http://127.0.0.1:1111`. Saved changes will live reload in the browser.

## Customisation

You can customize your configurations, templates and content for yourself. Look
at the `config.toml`, `theme.toml`, `content` files and templates files in this
repo for an idea.

### Global Configuration

There are some configuration options that you can customize in `config.toml`.

#### Configuration options before `extra` options

Set the tags taxonomy in the `config.toml`:

```toml
taxonomies = [
    { name = "tags" },
]
```

#### Configuration options under the `extra`

The following options should be under the `[extra]` in `config.toml`

- `language_code` - set HTML file language (default to `en-US`)
- `title_separator` - the separator to your site title, like `|` and `-` (defaults to `|`)
- `logo` - path to the logo image
- `google_analytics` - Google Analytics tracking ID
- `timeformat` - the timeformat for the blog article published date
- `timezone` - the timezone for the blog article published date
- `edit_page` - whether to show the edit page in the github repo for your posts
- `menu` - set the menu items for your site
- `contact_form_script_id` - the script id for the contact form based on [Google Script](https://github.com/en9inerd/learn-to-send-email-via-google-script-html-no-server)
- `[extra.github]` - set the GitHub metadata for your site
- `[extra.giscus]` - set the Giscus settings for your site
- `[extra.opengraph]` - set the Open Graph metadata for your site
...

### Templates

All pages are extend to the `base.html`, and you can customize them as need.

## Reporting Issues

We use GitHub Issues as the official bug tracker for the **Zola Hacker Theme**. Please
search [existing issues](https://github.com/en9inerd/zola-hacker/issues). It’s
possible someone has already reported the same problem.

If your problem or idea is not addressed yet, [open a new issue](https://github.com/en9inerd/zola-hacker/issues/new).

## License

**Zola Hacker Theme** is distributed under the terms of the
[MIT license](https://github.com/en9inerd/zola-hacker/blob/master/LICENSE).
