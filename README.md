# Youtube Trending Videos Scraper
A NodeJS application to scrap the popular videos from YouTube. 


## Getting Started

Download/Clone the repo and follow the Steps mentioned in the installation part to get started
```sh
$ git clone https://github.com/RahulShaw221994/youtube-trending-videos-scraper.git
```

### Prerequisites

* Install NodeJs (14.x)
**https://nodejs.org/en/download/** (windows)
**https://github.com/nodesource/distributions/blob/master/README.md**(Linux)

* Install MongoDB (4.4)
**https://www.mongodb.com/try/download/community** (windows)
**https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/**(Linux)

## Installation & Setup

1. Install package dependencies.
```sh
> cd youtube-trending-videos-scraper/backend
> npm install
```

2.In a separate shell/cmd start MongoDB.
```sh
> mongo (this will open mogno shell or you can use a mongo gui)
> use videoTrend (this will create a new db) 
> show dbs (list of databases)
```

## Start Node Backend

```sh
> np start or npm run dev (to start nodemon)
```

# API Routes

## endpoint to retrieve the popular videos from YouTube: "https://www.youtube.com/feed/trending" and save it to the database.
url:
```
http://localhost:3000/api/videosListUpdate
```
method:
```
PUT
```

## endpoint to return the videos list from the database.
url:
```
http://localhost:3000/api/videosList
```
method:
```
GET
```

## endpoint to  return the detail about a single video.
url:
```
http://localhost:3000/api/videoDetails/AKBF-jeOlD8
```
method:
```
GET

## Workflow
* Use the first api to intially scrape and save the trending vudeos in the database
* open video-list.html page to view the list of popular videos
* Click on Reload button to retrieve the videos again and saved it to the database.
* Click on any video card to view the video details page
## Built With

* HTML5/CSS3
* Javascript
* Bootstrap
* NodeJs
* Express Js
* MongoDB
* Mongoose

