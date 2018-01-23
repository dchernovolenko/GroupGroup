import json, sqlite3

dbf = "data/accounts.db"

def create_table():
    db = sqlite3.connect(dbf)

    c = db.cursor()
    command = "CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, points INTEGER);"
    c.execute(command)
    db.commit()
    db.close()

def us_table():
    db = sqlite3.connect(dbf)
    c = db.cursor()
    command = "CREATE TABLE IF NOT EXISTS us_cities (latitude INTEGER, longitude INTEGER);"
    c.execute(command)
    db.commit()
    db.close()

def populate_us():
    db = sqlite3.connect(dbf)
    c = db.cursor()
    us_file = open("data/themes/us_cities.csv")
    line = us_file.readline()
    while line:
        if "LATITUDE" in line:
            line = us_file.readline()
        else:
            parts = line.split(",")
            latitude = int(parts[1]) + int(parts[2]) / 60.0
            longitude = int(parts[3]) + int(parts[4]) / 60.0
            command = "INSERT INTO us_cities VALUES ('%s', '%s');" % (latitude, longitude)
            c.execute(command)
            line = us_file.readline()
    us_file.close()
    db.commit()
    db.close()

def get_us():
    db = sqlite3.connect(dbf)
    c = db.cursor()
    command = "SELECT * FROM us_cities ORDER BY RANDOM() LIMIT 1;"
    coord = c.execute(command)
    for entry in coord:
        latitude = entry[0]
        longitude = entry[1]
    return (latitude, longitude)

def get_locations(table):
    db = sqlite3.connect(dbf)
    c = db.cursor()
    command = "SELECT * FROM %s ORDER BY RANDOM() LIMIT 1;" % (table)
    location = c.execute(command)
    for entry in location:
        place = entry[0]
    return place[:-1] #remove newline at end

def datify(filename):
    file_obj = open("data/themes/" + filename, "rU")
    db = sqlite3.connect(dbf)
    c = db.cursor()
    tbl_name = filename[:-4]
    print tbl_name
    command = "CREATE TABLE IF NOT EXISTS %s (place TEXT);" % (tbl_name)
    c.execute(command)
    line = file_obj.readline()
    while line:
        print line
        line = line.replace("'","")
        command = "INSERT INTO %s VALUES ('%s');" % (tbl_name, line)
        c.execute(command)
        line = file_obj.readline()
    file_obj.close()
    db.commit()
    db.close()


def create_account(user, pw, points=0):
    db = sqlite3.connect(dbf)
    c = db.cursor()
    command = "INSERT INTO users VALUES ('%s', '%s', '%s');" % (user, pw, points)
    c.execute(command)
    db.commit()
    db.close()

def look_for(user):
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
    # print leaderboard()
    # us_table()
    # populate_us()
    # get_us()
    # datify("uni.csv")
    # print get_locations("uni")
    # datify("us_cities.csv")
    # print get_locations("us_cities")
    #datify("amusement.csv")
    #print get_locations("amusement")
    datify("africa.csv")
    print get_locations("africa")
    datify("asia.csv")
    print get_locations("asia")
    datify("europe.csv")
    print get_locations("europe")
    datify("north_america.csv")
    print get_locations("north_america")
    datify("oceania.csv")
    print get_locations("oceania")
    datify("world_capitals.csv")
    print get_locations("world_capitals")
