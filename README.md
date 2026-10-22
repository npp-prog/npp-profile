# npp-profile

Personal profile site for Neil Priolo, deployed on [Netlify](https://www.netlify.com/).

It's plain static HTML/CSS with no build step. Everything Netlify serves lives in `public/`.

## Fill in your content

Open `public/index.html` and replace the placeholder text (look for `TODO` comments) with the details from your LinkedIn profile: headline, location, About, experience, education, and skills. To add a photo, put it at `public/photo.jpg` and follow the comment in the hero section.

## Deploy to Netlify

1. Log in at https://app.netlify.com and choose **Add new site → Import an existing project**.
2. Pick GitHub and select the `npp-prog/npp-profile` repository.
3. Leave the build command empty. `netlify.toml` already sets the publish directory to `public`.
4. Click **Deploy**. Each push to the deployed branch redeploys the site.

The contact form uses [Netlify Forms](https://docs.netlify.com/forms/setup/). Submissions show up in the Netlify dashboard under **Forms**, and you can turn on email notifications there.

## Preview locally

```sh
python3 -m http.server -d public 8000
```

Then open http://localhost:8000.

## Claude Code setup

- `.claude/skills/ui-ux-pro-max/` is a design skill (from [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), MIT).
- `.mcp.json` connects the [21st.dev](https://21st.dev) MCP server. It reads the API key from the `TWENTYFIRST_API_KEY` environment variable, so the key is never committed. Set that variable in your Claude Code environment, and allow the `21st.dev` domain if your network access is limited.
