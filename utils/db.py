import json, sqlite3

def createTable():
    dbf = "data/accounts.db"
    db = sqlite3.connect(dbf)
    c = db.cursor()
    command = "CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT);"
    c.execute(command)
    db.commit()
    db.close()

def createAccount(user, pw):
    dbf = "data/accounts.db"
    db = sqlite3.connect(dbf)
    c = db.cursor()
    command = "INSERT INTO users VALUES (?, ?);"
    c.execute(command, [user, pw])
    db.commit()
    db.close()



if __name__ == "__main__":
    createTable()
    createAccount("normal_force", "m1*g")
