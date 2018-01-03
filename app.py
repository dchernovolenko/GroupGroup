from flask import Flask, render_template, request, session, redirect, url_for, flash
from random import *
import json, urllib2, sys, os
from utils import db

lat = 0
long = 0

my_app = Flask(__name__)
my_app.secret_key = os.urandom(64)


@my_app.route('/')
def root():
    lat = uniform(-65,65) # random floats; avoiding the arctic circles
    long = uniform(-180,180)
    print "latitude: ", lat, "longitude: ", long
    return render_template("game.html", latitude = lat, longitude = long, dictionary = status())

@my_app.route('/login', methods=['GET','POST']))
def login():
    if "user" in session:
        return redirect(url_for('root'))
    return render_template('login.html')

@my_app.route('/welcome', methods=['GET','POST'])
def welcome():
    print request.form


def status():
    object = urllib2.urlopen("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + str(lat) + "," + str(long) + "&key=AIzaSyCUg-iqhEm80I79bL5wCQ-_qB5bJxE76ro")
    string = object.read()
    return string
    # d = json.loads(string)

if __name__ == "__main__":
    my_app.debug = True
    my_app.run()
