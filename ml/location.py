import cv2
import subprocess
import platform
import netifaces
from datetime import datetime

from geopy.geocoders import Nominatim
import requests
import ssl



def fetch_camera_details():
    current_datetime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    index = 0
    details = ""
    while True:
        camera = cv2.VideoCapture(index)
        
        if camera.isOpened():
            width = camera.get(cv2.CAP_PROP_FRAME_WIDTH)
            height = camera.get(cv2.CAP_PROP_FRAME_HEIGHT)
            fps = camera.get(cv2.CAP_PROP_FPS)
            codec = camera.get(cv2.CAP_PROP_FOURCC)

            mac_address = fetch_mac_address()
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

def fetch_mac_address():
    if platform.system() == "Windows":
        result = subprocess.run(["ipconfig", "/all"], capture_output=True, text=True)
        for line in result.stdout.splitlines():
            if "Physical Address" in line:
                return line.split(":")[1].strip()
    elif platform.system() == "Linux":
        result = subprocess.run(["ifconfig"], capture_output=True, text=True)
        for line in result.stdout.splitlines():
            if "ether" in line:
                return line.split()[1]
    return "Unknown"

def fetch_ip_address():
    if platform.system() == "Windows":
        interfaces = netifaces.interfaces()
        for iface in interfaces:
            if iface != "Loopback Pseudo-Interface 1":
                addresses = netifaces.ifaddresses(iface)
                if netifaces.AF_INET in addresses:
                    return addresses[netifaces.AF_INET][0]["addr"]
    elif platform.system() == "Linux":
        result = subprocess.run(["hostname", "-I"], capture_output=True, text=True)
        return result.stdout.split()[0]
    return "Unknown"

def fetch_geolocation(ip_address):
    try:

        api_key = "e4b359601b5645619d9e8853147eebed"  # Remove spaces
        res = requests.get(f'https://api.ipgeolocation.io/ipgeo?apiKey={api_key}&ip={ip_address}')
        data = res.json()
        
        return data.get('latitude', ''), data.get('longitude', '')
    except Exception as e:
        print("Error fetching geolocation:", e)
        return None, None



def fetch_address(latitude, longitude):
    try:
        
        # geolocator = Nominatim(user_agent="CamS")
        # location = geolocator.reverse(f"{latitude}, {longitude}")
        response = requests.get(f"https://api.mapbox.com/search/geocode/v6/reverse?longitude={longitude}&latitude={latitude}&access_token=pk.eyJ1IjoiZ2FuZXNobW9oYW5waWxsYWkiLCJhIjoiY2x1d2p3dXV2MGRtZTJrcnl2eWg0Z2JoMSJ9.CS6RjrAg5CCjJBv-2Aqxrw")
        data = response.json()
        address = data['features'][0]['properties']['full_address']
        return address
    

    except Exception as e:
        print("Error fetching address:", e)
        return "Unknown"
    
if __name__ == "__main__":
    print(fetch_camera_details())
