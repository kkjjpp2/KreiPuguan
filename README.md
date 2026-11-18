# Krei Puguan portfolio

A static website. No build step. It runs as is on GitHub Pages.

## Files

- `index.html` is the home page (hero, 6 project cards, about, contact)
- `project-1.html` to `project-6.html` are the project pages
- `styles.css` holds all the styling and animations
- `main.js` holds the scroll animations, nav highlight, page fade and copy buttons
- `images/` is where your photos go

## Put it on GitHub Pages

1. Create a new repository on GitHub and upload everything in this folder to the top level of the repo (not inside another folder).
2. Open the repo's Settings, choose Pages, set the source to "Deploy from a branch", pick `main` and `/ (root)`, then save.
3. After a minute or two the site is live at `https://YOUR-USERNAME.github.io/REPO-NAME/`.

## Adding photos

Save each photo into the `images/` folder using these exact names, as .jpg files:

- `project-1-1.jpg` is the cover photo for project 1. It shows on the home page card and as the large photo on the project page.
- `project-1-2.jpg`, `project-1-3.jpg`, `project-1-4.jpg` are the three gallery photos on the project page.
- Use the same pattern for projects 2 to 6 (`project-2-1.jpg`, `project-3-1.jpg` and so on).

Until a file exists, the page shows a placeholder frame. Photos around 1600 pixels wide keep the site fast.

## Editing the text

Search each HTML file for the placeholder text ("Project title", "Course or club name", "Role title") and replace it. Each project needs two edits: its card in `index.html` and its own `project-N.html` page. Change the page `<title>` and `description` near the top of each project page as well.
