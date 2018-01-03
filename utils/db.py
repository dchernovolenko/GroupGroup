import json, sqlite3

def create_table():
    dbf = "data/accounts.db"
    db = sqlite3.connect(dbf)
    c = db.cursor()
    command = "CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT);"
    c.execute(command)
    db.commit()
    db.close()

def create_account(user, pw):
    dbf = "data/accounts.db"
    db = sqlite3.connect(dbf)
    c = db.cursor()
    command = "INSERT INTO users VALUES (?, ?);"
    c.execute(command, [user, pw])
    db.commit()
    db.close()

def look_for(user):
    dbf = "data/accounts.db"
    db = sqlite3.connect(dbf)
    c = db.cursor()
    command = "SELECT '%s' FROM users;" % (user)
    name = c.execute(command)
    if name == user:
        db.commit()
        db.close()
        return True
    db.commit()
    db.close()
    return False

if __name__ == "__main__":
    create_table()
    create_account("normal_force", "m1*g")
