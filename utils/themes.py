import json, sqlite3, random


def get_us_coord():
    us_file = open("data/themes/us_cities.csv")
    places = []
    line = us_file.readline()
    while line:
        if "LATITUDE" in line:
            line = us_file.readline()
        else:
            parts = line.split(",")
            latitude = int(parts[1]) + int(parts[2]) / 60.0
            longitude = int(parts[3]) + int(parts[4]) / 60.0
            places.append((latitude, longitude))
            line = us_file.readline()
    us_file.close()
    return random.choice(places)



if __name__ == "__main__":
    print get_us_coord()
