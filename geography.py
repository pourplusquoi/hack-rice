import googlemaps
from geopy.distance import vincenty

gmaps = googlemaps.Client(key='your-key')

def getLocation(address):
    info = gmaps.geocode(address)
    if len(info) == 0:
        return None
    location = info[0]['geometry']['location']
    return (location['lat'], location['lng'])

def distance(locationA, locationB):
    return vincenty(locationA, locationB).km