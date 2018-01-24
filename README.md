# Geopardy
### by G.R.O.U.P. Group
#### Daniel Chernovolenko, Jerome Freudenberg, Yiduo Ke, Alex Taradachuk<br>SoftDev1 pd8<br>Project 02 -- The Final One

### Description

Geopardy is a Flask-based web app that offers users the opportunity to challenge their geographical know-how by displaying a google street-view of a location with a specific theme (e.g. United States, World Capitals, European Soccer Stadiums) and having the user place a pin on a map to indicate their estimate of the location. The software will then find the distance between the two and award a certain number of points to the user based on the accuracy of their guess. Users will also have the option to log in to have their cumulative points displayed on a leaderboard so they can compare their scores with their friends in the spirit of mature competition.

## Video Link
https://youtu.be/azpnWi_RUFc

## Launch Instructions


0. Enter your terminal and go into the directory that you want to have this program in
1. Add the keys csv files to the directory, obtained by contacting the PM (Alex)
2. Enter this command to clone our repo
```
$ git clone https://github.com/taradactyl27/GroupGroup.git
```
3. Run your virtualenv from wherever you have it (if needed)
```
. <PATH_TO_VIRTUALENV>/bin/activate
```
4. Go into the GroupGroup folder using this command
```
cd GroupGroup/
```
5. Run the program
```
python app.py
```
6. Go to localhost:5000 in your web browser and have fun playing!

## Usage Instructions and Tips
* Upon launching the web app, you will be met by a page displaying a play game button and several theme options below. At this point you can:
  * Make an account to enter the leaderboard
  * Just start playing casually
* If you would like to play a normal, global game without a theme, you can go ahead and press play game.
* To choose one of the theme options, select any of the themes below and then press play game.
  * Your chosen theme will stay selected until you go back to normal game.
  * If you want to go back to a regular game, then you can choose the first theme listed.
* Have fun!

## API Key Instructions

#### Google stuff
1. Make a google account
2. Create a project in the [Google Developers Console](https://console.developers.google.com)
3. [Open the API Library](https://console.developers.google.com/apis/library?project=_) and make sure it is enabled
4. Use your key!

## Dependencies
* `from flask import Flask, render_template, request, session, redirect, url_for, flash`
  * requires `pip install flask`
* [`python2.7`](https://www.python.org/download/releases/2.7/)
* `import json, urllib2, sys, os, sqlite3, random`
  * should be included with python

## Bugs and Issues
* You can submit your guess before it chooses a location
* Sometimes it takes a long time if it lands in an area far from a streetview (it keeps increasing the radius until it hits a giving up threshold, where it re-chooses a random location)
* Passwords are not hashed (so Mr. DW could hack our accounts if it pleased him).
* For people who love geography a lot, there are only 25,000 API calls per day.
* Doesn't taste very good

## File Structure
```
data/
  themes/
    | africa.csv
    | amusement.csv
    | asia.csv
    | europe.csv
    | north_america.csv
    | oceania.csv
    | south_america.csv
    | stadiums.csv
    | uni.csv
    | us_cities.csv
    | world_capitals.csv
  | accounts.db
  | key.csv **<--- INSERT KEY HERE**
static/
  css/
    |  bodystylesheet.css
    |  loginstylesheet.css
  images/
    |  background.jpg
    |  africa.jpg
    |  amuse.jpg
    |  asia.jpg
    |  au.jpg
    |  capitol.jpg
    |  eu.jpg
    |  na.jpg
    |  SA.jpg
    |  unis.jpg
    |  us.jpg
    |  world.jpg
  | game.js
  | home.js
templates/
  | game.html
  | home.html
  | leaderboard.html
  | login.html
  | loginbase.html
  | register.html
  | test.html
  | uniTemp.html
utils/
  | convertjson.json
  | db.py
  | test.csv
  | themes.py
.gitignore
app.py
changes.txt
design.pdf
devlog.txt
log.sh
README.md
```
