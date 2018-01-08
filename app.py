from flask import Flask, render_template, request, session, redirect, url_for, flash
from random import *
import json, urllib2, sys, os
import sqlite3, os
from utils import db

my_app = Flask(__name__)
my_app.secret_key = os.urandom(64)


@my_app.route('/')
def root():
    return render_template("game.html")


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
    username = session.pop('user')
    flash ("Logged out " + username)
    return redirect(url_for('login'))

@my_app.route('/addScore', methods=['GET'])
def addScore():
    if ('user' in session):
        data = request.args.get("score")
        data = float(data)
        add_points(session['user'], data)
        response = json.dumps({"success": "yesss"})
    else:
        response = json.dumps({"failed because not logged in": "nooooo"})

    return response

def add_points(user, points):
    dbf = "data/accounts.db"
    db = sqlite3.connect(dbf)
    c = db.cursor()
    command = "UPDATE users SET points = points + '%d' WHERE username = \"" % (points) + user + "\";"
    c.execute(command)
    db.commit()
    db.close()
    return points #returns points added

if __name__ == "__main__":
    my_app.debug = True
    my_app.run()