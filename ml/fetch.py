import os
import json

def get_user_details(user_id):
    user_data_dir = "user_data"
    user_folder = os.path.join(user_data_dir, str(user_id))
    if os.path.exists(user_folder):
        details_path = os.path.join(user_folder, "details.json")
        if os.path.exists(details_path):
            with open(details_path, "r") as json_file:
                data = json.load(json_file)
                return data
    return None
