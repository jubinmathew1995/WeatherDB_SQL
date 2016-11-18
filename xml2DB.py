from bs4 import BeautifulSoup

file = open("/home/jubin/WeatherDB_SQL/raw data/bangalore.xml")
soup = BeautifulSoup(file,"xml")

for x in soup.find_all('current'):
    city_id=x.city['id']
    city_name = x.city['name']
    country_code = x.country.string

    rise = x.sun['rise']
    set = x.sun['set']
    # print(rise +"\t"+set)

    recordtime = x.lastupdate['value']
    # print (recordtime)

    humidity_value = x.humidity['value']
    humidity_unit = x.humidity['unit']
    #print (humidity_value+humidity_unit)


    pressure_value = x.pressure['value']
    pressure_unit = x.pressure['unit']
    #print (pressure_value+pressure_unit)

    if(x.temperature['unit']=='kelvin'):
        temp_k =x.temperature['value']
        #print (temp_k)

    wind = x.wind
    w_speed = wind.speed['value']
    w_type = wind.speed['name']
    w_direction = wind.direction['code']
    w_degree = wind.direction['value']
    #print (w_speed+w_type+w_degree+w_direction)
    #print "\n"
