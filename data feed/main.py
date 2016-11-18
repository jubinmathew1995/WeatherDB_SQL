# program to feed the data to the weather_type table from the "mab.txt" file

import pymysql.cursors
import pymysql

# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='jubin',
                             password='jubin',
                             db='testing',
                             charset='utf8',
                             cursorclass=pymysql.cursors.DictCursor)

with connection.cursor() as cursor:
    # Create a new record
    with open('mab.txt') as f:
		for line in f:
			wid=line[0:3]
			wtype=line[5:len(line)-2]
			sql = "INSERT INTO `weather_type` (`wid`, `wtype`) VALUES (%s, %s)"
			cursor.execute(sql, (int(wid), wtype))
   			print line[0:3]
   			print line[5:len(line)-2]
   			connection.commit()

# with connection.cursor() as cursor:
#     # Read a single record
#     sql = "SELECT * FROM weather_type;"
#     cursor.execute(sql)
#     result = cursor.fetchone()
#     print(str(result['wid'])+result['wtype'])


