# app/utils/config.py
from geopy.geocoders import Nominatim

def get_lat_lon(city, state, country):
    geolocator = Nominatim(user_agent="geoapi")
    location = geolocator.geocode(f"{city}, {state}, {country}")
    if location:
        return location.latitude, location.longitude
    return None, None
