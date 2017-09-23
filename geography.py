import numpy as np
from geopy.geocoders import Nominatim

def getLocation(address):
    geolocator = Nominatim()
    location = geolocator.geocode(address)
    return location

def distance(locationA, locationB):
    latA, lonA = locationA.latitude, locationA.longitude
    latB, lonB = locationB.latitude, locationB.longitude
    
    deltaLat = np.abs(latA - latB) * np.pi / 180
    deltaLon = np.abs(lonA - lonB) * np.pi / 180
    degree = np.arccos(np.cos(deltaLat) * np.cos(deltaLon))

    return 6378.0 * degree