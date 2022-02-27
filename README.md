# YouTubeScrapper
Clone the repo and run npm i to install all the packages.

## What does this do?
The module works by fetching all videos of a channel and getting description of every video as well.

Workflow:
* Provide Youtube API key via `API_KEY` env variable.
* Update `input>input.csv` with comma separated channel ids of all the channels you want data for.
* Run `npm start`.
* Check `output>{channel_id}.csv` to have data for that particular channel.