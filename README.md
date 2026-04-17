# AI Medical Platform

Angular frontend for a biomedical assistant interface focused on medical imaging workflows.

## Local development

```bash
npm ci
npm start
```

The app will be available at `http://localhost:4200/`.

## Production build

```bash
npm run build
```

## GitHub Pages deployment

This project includes a GitHub Actions workflow at `.github/workflows/pages.yml`.

After pushing this code to a dedicated GitHub repository, enable `Settings > Pages > Source > GitHub Actions`.
The workflow will build the Angular app and publish it as a project site at:

`https://felipecordeiiro.github.io/<repository-name>/`

The workflow also creates a `404.html` fallback so Angular routes continue to work on GitHub Pages.
