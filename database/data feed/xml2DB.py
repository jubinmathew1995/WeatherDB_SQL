# program to feed the data to the weather_type table from the "mab.txt" file
from bs4 import BeautifulSoup
import pymysql.cursors
import pymysql

# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='admin',
                             password='admin',
                             db='weather',
                             charset='utf8',
                             cursorclass=pymysql.cursors.DictCursor)
cursor= connection.cursor()
flag=0
array=['bangalore.xml','boston.xml','delhi.xml','frankfort.xml','kolkata.xml','losangeles.xml','moscow.xml','mumbai.xml','newyork.xml','paris.xml']
for ele in array:
    file = open("/home/jubin/WeatherDB_SQL/raw data/"+ele)
    soup = BeautifulSoup(file,"xml")
    y=soup.find_all('current')
    id=y[0].city['id']
    name = y[0].city['name']
    code = y[0].country.string
    sql = "INSERT INTO `city` (`cityid`, `cityname`, `countrycode`) VALUES (%s, %s, %s)"
    cursor.execute(sql, (int(id), name, code))
    connection.commit()

    for x in soup.find_all('current'):
        city_id=x.city['id']
        city_name = x.city['name']
        country_code = x.country.string

        rise = x.sun['rise']
        set_t = x.sun['set']

        recordtime = x.lastupdate['value']

        humidity_value = x.humidity['value']
        humidity_unit = x.humidity['unit']

        pressure_value = x.pressure['value']
        pressure_unit = x.pressure['unit']

        if(x.temperature['unit']=='kelvin'):
            temp_k =x.temperature['value']
            uni=temp_k.encode('utf8')

        wind = x.wind
        w_speed = wind.speed['value']
        w_type = wind.speed['name']
        w_direction = wind.direction['code']
        w_degree = wind.direction['value']

        weth_id = x.weather['number']
        flag=flag+1
        sql1 = "INSERT INTO `observation` (`id`, `oid`, `wid`, `risetime`, `settime`, `recordtime`, `humidity`, `preasure`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s )"
        cursor.execute(sql1, (int(city_id), flag, int(weth_id), rise, set_t, recordtime, humidity_value, pressure_value))
        connection.commit()
        sql3 = "INSERT INTO `temperature` (`oid`, `val_k`, `val_c`) VALUES (%s, %s, %s)"
        cursor.execute(sql3, (flag, float(uni), (float(uni)-273)))
        connection.commit()
        sql4 = "INSERT INTO `wind` (`oid`, `speed`, `type`, `direction`, `degree`) VALUES (%s, %s, %s, %s,%s)"
        cursor.execute(sql4, (flag, (w_speed), w_type, w_direction, (w_degree)))
        connection.commit()
