from flask import Flask, render_template, request, session, redirect, url_for, flash
from random import *
import json, urllib2, sys, os
import sqlite3, os
from utils import db, themes

my_app = Flask(__name__)
my_app.secret_key = os.urandom(64)

theme = "us_cities"
theme_toggle = 0


@my_app.route('/')
def root():
    return render_template("home.html")


@my_app.route('/leaderboard')
def leaderboard():
    lb = db.leaderboard()
    return render_template("leaderboard.html", lb = lb)


@my_app.route('/game')
def home():
    fd = open('data/key.csv', 'r')
    return render_template('game.html', key = fd.read())


@my_app.route('/login', methods=['GET','POST'])
def login():
    if "user" in session:
        return redirect(url_for('root'))
    return render_template('login.html')

@my_app.route('/authenticate', methods=['GET','POST'])
def authenticate():
    user = request.form['username']
    pw = request.form['password']

    print "[app] user is " + user
    print "[app] pw is " + pw

    if db.look_for(user):
        #authenticate pass
        print "hi"
        if db.check_pass(user, pw):
            session['user'] = user
            return redirect(url_for('root'))
        else:
            flash ("Incorrect Password.")
            return redirect(url_for('login'))
    else:
        flash ("User does not exist.")
        return redirect(url_for('login'))

@my_app.route('/register', methods=['GET','POST'])
def register():
    if 'user' in session:
        return redirect(url_for('root'))
    return render_template('register.html')

@my_app.route('/user_creation', methods=['POST'])
def user_creation():
    user = request.form['username']
    pw = request.form['password']
    pw_confirm = request.form['confirm']

    if db.look_for(user):
        flash ("User already exists")
        return redirect(url_for('register'))
    if pw != pw_confirm:
        flash ("Passwords must match")
        return redirect(url_for('register'))
    db.create_account(user, pw, 0)
    flash ("Account Created")
    return redirect(url_for('login'))

@my_app.route('/logout', methods=['GET', 'POST'])
def logout():
    if "user" in session:
        username = session.pop('user')
        flash ("Logged out " + username)
        return redirect(url_for('login'))
    else:
        return redirect(url_for('root'))

@my_app.route('/addScore', methods=['GET'])
def addScore():
    if ('user' in session):
        data = request.args.get("score")
        data = float(data)
        db.add_points(session['user'], data)
        response = json.dumps({"success": data })
    else:
        response = json.dumps({"failed because not logged in": "nooooo"})

    return response


@my_app.route('/theme/<table>', methods = ['POST'])
def theme(table):
    place = db.get_locations(table)
    print place
    response = json.dumps({"place": place})
    print response
    return response

if __name__ == "__main__":
    my_app.debug = True
    my_app.run()
