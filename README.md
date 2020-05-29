# Birthday Playlist Generator

**This project is currently a work in progress.**

The idea behind this app is to automatically generate a Spotify Playlist of songs which have reached UK number one on your Birthday. There are 2 parts to this project:

### OfficialCharts Parser
This is a short Python script which can be manually run to scrape the latest chart info from [OfficialCharts](https://www.officialcharts.com/chart-news/all-the-number-1-singles__7931/). This data can then be saved to [JSONBIN.io](https://jsonbin.io) to be used by the web app.

### Web app
This is a React app which allows you to enter your Birthday and it will query the data on JSONBin and find the tracks which were number one on your past birthdays. The next step in this project is to link with Spotify to provide further track info and automatically generate a playlist.