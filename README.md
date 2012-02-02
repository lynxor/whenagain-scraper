# Whenagain scraper

Scrape by generating the dom and using sizzle selectors 


## Usage


To run the scrapers, run 

       ./scrape.sh

You can do a dry run by using the --dry-run option.  This will just print out all the items that were scraped and not attempt to push it somewhere.

Host and port to push to can be provided as the first and second parameters:

     ./scrape.sh localhost 12345

## Requirements

You need Node.js and the following node modules: 

    * jsdom
    * zombie
 

