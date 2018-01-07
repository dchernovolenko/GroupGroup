import json, sqlite3

def create_table():
    dbf = "data/accounts.db"
    db = sqlite3.connect(dbf)
    c = db.cursor()
    command = "CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, points INTEGER);"
    c.execute(command)
    db.commit()
    db.close()

def create_account(user, pw, points=0):
    dbf = "data/accounts.db"
    db = sqlite3.connect(dbf)
    c = db.cursor()
    command = "INSERT INTO users VALUES ('%s', '%s', '%s');" % (user, pw, points)
    c.execute(command)
    db.commit()
    db.close()

def look_for(user):
    dbf = "data/accounts.db"
    db = sqlite3.connect(dbf)
    c = db.cursor()
    command = "SELECT username FROM users;"
    name = c.execute(command)
    for account in name:
        for entry in account:
            print entry
            print "[db] user is " + entry
            print "[db] input user is " + user
            if entry == user:
                db.commit()
                db.close()
                return True
    db.commit()
    db.close()
    return False

def check_pass(user, pw):
    dbf = "data/accounts.db"
    db = sqlite3.connect(dbf)
    c = db.cursor()
    command = "SELECT password FROM users WHERE username = \"" + user + "\";"
    check_pw = c.execute(command)
    print check_pw
    for entry in check_pw:
        print entry
        print "[db] check pw is " + entry[0]
        print "[db] input pw is " + pw
        if entry[0] == pw:
            db.commit()
            db.close()
            return True
    db.commit()
    db.close()
    return False


def add_points(user, points):
    dbf = "data/accounts.db"
    db = sqlite3.connect(dbf)
    c = db.cursor()
    command = "UPDATE users SET points = points + '%d' WHERE username = \"" % (points) + user + "\";"
    c.execute(command)
    db.commit()
    db.close()
    return points #returns points added

def leaderboard():
    lb = []
    dbf = "data/accounts.db"
    db = sqlite3.connect(dbf)
    c = db.cursor()
    command = "SELECT username, points FROM users ORDER BY points DESC;"
    order_list = c.execute(command)
    for entry in order_list:
        lb.append((entry[0], entry[1]))
        #lb.append()
    return lb


if __name__ == "__main__":
    # create_table()
    # create_account("normal_force", "m1*g", 10)
    # add_points("normal_force", 10)
    print leaderboard()
