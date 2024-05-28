import cv2
from datetime import datetime
import requests

def fetch_camera_details():
    current_datetime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    index = 0
    details = ""
    while True:
        camera = cv2.VideoCapture(index)
        
        if camera.isOpened():
            ip_address = '110.226.182.142'
            latitude, longitude = fetch_geolocation(ip_address)
            address = fetch_address(latitude, longitude)
            details += f"Date and Time: {current_datetime}\n"
            details += f"Camera Index: {index}\n"
            details += f"IP Address: {ip_address}\n"
            details += f"Latitude: {latitude}, Longitude: {longitude}\n\n"
            details += f"Address: {address}\n\n"

            camera.release()
            
            index += 1
        else:
            break

    return details

def fetch_geolocation(ip_address):
    try:

        api_key = "1c6b0140cdc44c4da9ae5ec30bc47e58"  # Remove spaces
        res = requests.get(f'https://api.ipgeolocation.io/ipgeo?apiKey={api_key}&ip={ip_address}')
        data = res.json()
        
        return data.get('latitude', ''), data.get('longitude', '')
    except Exception as e:
        print("Error fetching geolocation:", e)
        return None, None

def fetch_address(latitude, longitude):
    try:
        response = requests.get(f"https://api.mapbox.com/search/geocode/v6/reverse?longitude={longitude}&latitude={latitude}&access_token=pk.eyJ1IjoiZ2FuZXNobW9oYW5waWxsYWkiLCJhIjoiY2x3cTF3c3hnMGprMjJscDF5Zm9hYnJmeCJ9.KM97W9GypZJ5C5oNtYcc5A")
        data = response.json()
        address = data['features'][0]['properties']['full_address']
        return address
    
    except Exception as e:
        print("Error fetching address:", e)
        return "Unknown"
    
if __name__ == "__main__":
    print(fetch_camera_details())
