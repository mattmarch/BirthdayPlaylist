# Birthday Playlist Generator

**This project is currently a work in progress.**

The idea behind this app is to automatically generate a Spotify Playlist of songs which have reached UK number one on your Birthday. There are 2 parts to this project:

### OfficialCharts Parser
This is a short Python script which can be run to scrape the latest chart info from [OfficialCharts](https://www.officialcharts.com/chart-news/all-the-number-1-singles__7931/). If run with a `-u` argument the data will be uploaded to [JSONBIN.io](https://jsonbin.io) to be used by the web app.

### Web app
This is a React app which allows you to enter your Birthday and it will query the data on JSONBin and find the tracks which were number one on your past birthdays. When this is displayed it will provide a link to authorize with Spotify via the Implicit Grant flow [as detailed here](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow). The app can then use the access token received from Spotify to match up the tracks with tracks on Spotify, and displays the Spotify track name and album art in a list.

There is then the option to automatically create a playlist on Spotify with those tracks.