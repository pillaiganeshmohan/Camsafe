import cv2
from datetime import datetime
import requests

def fetch_camera_details():
    current_datetime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    index = 0
    camera_details_list = []
    
    while True:
        camera = cv2.VideoCapture(index)
        
        if camera.isOpened():
            ip_address = '110.226.182.142'
            latitude, longitude = fetch_geolocation(ip_address)
            address = fetch_address(latitude, longitude)
            
            camera_details = {
                'Date_and_Time': current_datetime,
                'Camera_Index': index,
                'IP_Address': ip_address,
                'latitude': latitude,
                'longitude': longitude,
                'address': address
            }
            camera_details_list.append(camera_details)

            camera.release()
            index += 1
        else:
            break

    return camera_details

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
    camera_details = fetch_camera_details()
    for detail in camera_details:
        print(detail)
