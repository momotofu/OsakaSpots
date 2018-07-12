# osokaspots
A map of all all my favorite places in Osaka, Japan.

![Alt text](/app_screen_shot.png?raw=true "App Screen Shot")

## Usage
1. download repo `git clone https://github.com/momotofu/OsakaSpots.git`
2. Open your terminal and change into the root of the directory
3. Install JavaScript dependencies by running $ `npm i`
4. Input API keys by runing $ `source set_env`

#### Add custom data to the database
1. Add your custom data to `src/backend/createDB.js`
2. Build the database by running $ `npm run migrate`
3. Populate the database by running $ `node src/backend/createDB.js`

#### Run for production
1. Build JavaScript bundle $ `npm run build`
2. Serve application by running $ `npm run prod`
3. Visit `localhost:9000` in your browser

#### Run for dev mode
1. Run the dev server $ `npm start`
2. Visit `localhost:8080` in your browser

## Web application features and technologies
- Fuse.js
- Knex.js
- Objection.js
- Express.js
- Node.js
- Knockout.js
- Nodemon
- concurrently
- Stylus
- Pug
- Webpack
- SQLite3
- Google Maps JavaScript API
- Yelp Fusion API
- Bash
- JavaScript
- Custom input cursor! Oh yeah! - so stoked about this
