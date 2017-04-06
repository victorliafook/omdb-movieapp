# OMDB-MovieApp
Angular web application integrated with OMDB API.

# Features
- Responsible, Mobile-First app.
- Search and sort results fetched from the API.
- Card Layout.

# Build Instructions
Very straightforward. Just install the npm and bower dependencies and the run the default gulp task.
```
$ npm install
$ bower install
$ gulp
```
All content to be published will be now at the /dist directory.

# Publishing
After built, just publish /dist directory on a http web server.

# API Quirks
- The OMDB API restricts each get request to 10 results;
- Some pictures are missing;
