# QIWI Portfolio

Static portfolio website. Published files are in `site/`.

## Deployment

In repository Settings → Pages, choose **GitHub Actions** as the publishing source. Pushes to `main` then deploy automatically using `.github/workflows/pages.yml`.

The site uses relative asset paths and hash navigation, so it can be hosted under a GitHub Pages project path without modifying the pages.

## Local preview

Run `python -m http.server 4175 --directory site`, then open `http://localhost:4175/`.

Original artwork and contact details are supplied by the portfolio owner. No third-party license is granted by this repository.
