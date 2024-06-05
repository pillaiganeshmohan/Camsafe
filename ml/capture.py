import cv2
import face_recognition
import tkinter as tk
from tkinter import filedialog, messagebox
import os
import json
from PIL import Image, ImageTk
import shutil
import requests



class camS:
    def __init__(self, root):
        self.root = root
        self.root.title("CamSafe")

        self.video_capture = cv2.VideoCapture(0)
        self.current_frame = None
        self.subject_name_var = tk.StringVar()
        self.subject_id_var = tk.StringVar()
        self.subject_gender_var = tk.StringVar()
        self.subject_age_var = tk.StringVar()
        self.subject_aadhar_no_var = tk.StringVar()
        self.subject_latitude_var = tk.StringVar()
        self.subject_longitude_var = tk.StringVar()
        self.subject_image_paths = []

        # Create GUI components
        self.canvas = tk.Canvas(root, width=640, height=300)
        self.canvas.pack()

        self.menu_frame = tk.Frame(root)
        self.menu_frame.pack()

        self.new_user_button = tk.Button(self.menu_frame, text="New User", command=self.show_new_user_options)
        self.new_user_button.pack()

        self.update_user_button = tk.Button(self.menu_frame, text="Update User", command=self.show_update_user_options)
        self.update_user_button.pack()

        self.delete_user_button = tk.Button(self.menu_frame, text="Delete User", command=self.show_delete_user_options)
        self.delete_user_button.pack()

        self.show_users_button = tk.Button(self.menu_frame, text="Show Users", command=self.show_users)
        self.show_users_button.pack()

        self.quit_button = tk.Button(root, text="Quit", command=self.quit_app)
        self.quit_button.pack()

        # Initialize user management frames
        self.new_user_frame = None
        self.update_user_frame = None
        self.delete_user_frame = None
        self.show_users_frame = None

        # Dictionary to hold user checkboxes
        self.user_checkboxes = {}

    def show_new_user_options(self):
        self.hide_menu()
        self.new_user_frame = tk.Frame(self.root)
        self.new_user_frame.pack()

        # New user input fields
        self.create_input_field(self.new_user_frame, "Enter Name:", self.subject_name_var)
        self.create_input_field(self.new_user_frame, "Enter ID:", self.subject_id_var)
        self.create_input_field(self.new_user_frame, "Select Gender:", self.subject_gender_var, is_radio=True)
        self.create_input_field(self.new_user_frame, "Enter Age:", self.subject_age_var)
        self.create_input_field(self.new_user_frame, "Enter aadhar_no Number:", self.subject_aadhar_no_var)
        self.create_input_field(self.new_user_frame, "Enter Latitude:", self.subject_latitude_var)
        self.create_input_field(self.new_user_frame, "Enter Longitude:", self.subject_longitude_var)

        self.browse_button = tk.Button(self.new_user_frame, text="Browse Image(s)", command=self.browse_image)
        self.browse_button.pack()

        self.save_button = tk.Button(self.new_user_frame, text="Save Data", command=self.save_data)
        self.save_button.pack()

        # Back button
        back_button = tk.Button(self.new_user_frame, text="Back", command=self.show_menu)
        back_button.pack()

    def show_update_user_options(self):
        self.hide_menu()
        self.update_user_frame = tk.Frame(self.root)
        self.update_user_frame.pack()

        # Update user input fields
        self.create_input_field(self.update_user_frame, "Enter ID:", self.subject_id_var)
        self.create_input_field(self.update_user_frame, "Select Gender:", self.subject_gender_var, is_radio=True)
        self.create_input_field(self.update_user_frame, "Enter Age:", self.subject_age_var)
        self.create_input_field(self.update_user_frame, "Enter aadhar_no Number:", self.subject_aadhar_no_var)
        self.create_input_field(self.update_user_frame, "Enter Latitude:", self.subject_latitude_var)
        self.create_input_field(self.update_user_frame, "Enter Longitude:", self.subject_longitude_var)

        self.browse_button = tk.Button(self.update_user_frame, text="Browse Image(s)", command=self.browse_image)
        self.browse_button.pack()

        self.save_button = tk.Button(self.update_user_frame, text="Update Data", command=self.update_data)
        self.save_button.pack()

        # Back button
        back_button = tk.Button(self.update_user_frame, text="Back", command=self.show_menu)
        back_button.pack()

    def show_delete_user_options(self):
        self.hide_menu()
        self.delete_user_frame = tk.Frame(self.root)
        self.delete_user_frame.pack()

        # Delete user input fields
        user_data_dir = "user_data"
        if os.path.exists(user_data_dir):
            user_ids = [folder_name.split("-")[0] for folder_name in os.listdir(user_data_dir) if os.path.isdir(os.path.join(user_data_dir, folder_name))]
            for user_id in user_ids:
                checkbox = tk.Checkbutton(self.delete_user_frame, text=user_id)
                checkbox.pack(anchor=tk.W)
                self.user_checkboxes[user_id] = checkbox

        # Delete button
        delete_button = tk.Button(self.delete_user_frame, text="Delete Selected Users", command=self.delete_users)
        delete_button.pack()

        # Back button
        back_button = tk.Button(self.delete_user_frame, text="Back", command=self.show_menu)
        back_button.pack()

    def delete_users(self):
        selected_users = [user_id for user_id, checkbox in self.user_checkboxes.items() if checkbox.var.get() == 1]

        user_data_dir = "user_data"
        for user_id in selected_users:
            user_folder_path = os.path.join(user_data_dir, f"{user_id}-{self.get_user_name(user_id)}")
            shutil.rmtree(user_folder_path)

        messagebox.showinfo("Success", "Selected users have been deleted.")
        self.show_delete_user_options()

    def get_user_name(self, user_id):
        user_data_dir = "user_data"
        details_path = os.path.join(user_data_dir, f"{user_id}", "details.json")
        if os.path.exists(details_path):
            with open(details_path, "r") as json_file:
                data = json.load(json_file)
                return data.get("name", "Unknown")
        return "Unknown"

    def show_users(self):
        self.hide_menu()
        self.show_users_frame = tk.Frame(self.root)
        self.show_users_frame.pack()

        user_data_dir = "user_data"
        if os.path.exists(user_data_dir):
            user_ids = [folder_name.split("-")[0] for folder_name in os.listdir(user_data_dir) if os.path.isdir(os.path.join(user_data_dir, folder_name))]
            for user_id in user_ids:
                user_name = self.get_user_name(user_id)
                label = tk.Label(self.show_users_frame, text=f"{user_id} - {user_name}")
                label.pack(anchor=tk.W)

        # Back button
        back_button = tk.Button(self.show_users_frame, text="Back", command=self.show_menu)
        back_button.pack()

    def hide_menu(self):
        self.menu_frame.pack_forget()
        if self.new_user_frame:
            self.new_user_frame.pack_forget()
        if self.update_user_frame:
            self.update_user_frame.pack_forget()
        if self.delete_user_frame:
            self.delete_user_frame.pack_forget()
        if self.show_users_frame:
            self.show_users_frame.pack_forget()

    def show_menu(self):
        self.menu_frame.pack()
        if self.new_user_frame:
            self.new_user_frame.pack_forget()
        if self.update_user_frame:
            self.update_user_frame.pack_forget()
        if self.delete_user_frame:
            self.delete_user_frame.pack_forget()
        if self.show_users_frame:
            self.show_users_frame.pack_forget()

    def create_input_field(self, parent_frame, label_text, text_variable, is_radio=False):
        label = tk.Label(parent_frame, text=label_text)
        label.pack()
        if is_radio:
            frame = tk.Frame(parent_frame)
            frame.pack()
            radio_male = tk.Radiobutton(frame, text="Male", variable=text_variable, value="Male")
            radio_male.pack(side=tk.LEFT)
            radio_female = tk.Radiobutton(frame, text="Female", variable=text_variable, value="Female")
            radio_female.pack(side=tk.LEFT)
            radio_transgender = tk.Radiobutton(frame, text="Transgender", variable=text_variable, value="Transgender")
            radio_transgender.pack(side=tk.LEFT)
        else:
            entry = tk.Entry(parent_frame, textvariable=text_variable, width=30, justify='center')
            entry.pack()

            # Add real-time input validation
            if label_text == "Enter Name:":
                entry.config(validate="key", validatecommand=(self.root.register(self.validate_name), "%P"))
            elif label_text == "Enter ID:":
                entry.config(validate="key", validatecommand=(self.root.register(self.validate_digits), "%P"))
            elif label_text == "Enter Age:":
                entry.config(validate="key", validatecommand=(self.root.register(self.validate_age), "%P"))
            elif label_text == "Enter Aadhar Number:":
                entry.config(validate="key", validatecommand=(self.root.register(self.validate_aadhar_no), "%P"))
            elif label_text == "Enter Latitude:":
                entry.config(validate="key", validatecommand=(self.root.register(self.validate_lat_lon), "%P"))
            elif label_text == "Enter Longitude:":
                entry.config(validate="key", validatecommand=(self.root.register(self.validate_lat_lon), "%P"))

    def validate_name(self, name):
        return all(x.isalpha() or x.isspace() for x in name)

    def validate_digits(self, value):
        return value.isdigit()

    def validate_age(self, age):
        return age.isdigit() and len(age) <= 3

    def validate_aadhar_no(self, aadhar_no):
        return aadhar_no.isdigit() and len(aadhar_no) <= 12

    def validate_lat_lon(self, value):
        try:
            float(value)
            return True
        except ValueError:
            return False

    def capture_image(self):
        ret, frame = self.video_capture.read()
        if ret:
            self.current_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            self.display_frame()

    def browse_image(self):
        file_paths = filedialog.askopenfilenames(title="Select Image Files", filetypes=[("Image files", "*.jpg;*.jpeg;*.png")])
        if file_paths:
            self.subject_image_paths = list(file_paths)
            self.subject_image_path = self.subject_image_paths[0]
            image = Image.open(self.subject_image_path)
            self.current_frame = ImageTk.PhotoImage(image)
            self.display_frame()

    def display_frame(self):
        self.canvas.create_image(0, 0, anchor=tk.NW, image=self.current_frame)

    def save_data(self):
        subject_name = self.subject_name_var.get()
        subject_id = self.subject_id_var.get()
        subject_gender = self.subject_gender_var.get()
        subject_age = self.subject_age_var.get()
        subject_aadhar_no = self.subject_aadhar_no_var.get()
        subject_latitude = self.subject_latitude_var.get()
        subject_longitude = self.subject_longitude_var.get()

        if not all([subject_name, subject_id, subject_gender, subject_age, subject_aadhar_no, subject_latitude, subject_longitude, self.subject_image_paths]):
            messagebox.showerror("Error", "Please fill in all fields.")
            return

        folder_path = os.path.join("user_data", subject_id)
        os.makedirs(folder_path, exist_ok=True)

        image_urls = []
        for i, image_path in enumerate(self.subject_image_paths):
            image = face_recognition.load_image_file(image_path)
            image_filename = f"image_{i}.jpg"
            image_save_path = os.path.join(folder_path, image_filename)
            cv2.imwrite(image_save_path, cv2.cvtColor(image, cv2.COLOR_RGB2BGR))
            image_urls.append(image_save_path)

        data = {
            "name": subject_name,
            "id": subject_id,
            "gender": subject_gender,
            "age": subject_age,
            "aadhar_no": subject_aadhar_no,
            "latitude": subject_latitude,
            "longitude": subject_longitude,
        }
        json_path = os.path.join(folder_path, "details.json")
        with open(json_path, "w") as json_file:
            json.dump(data, json_file)

        api_url = "http://127.0.0.1:8000/api/subjectdetails/"
        try:
            files = [("uploaded_images", open(image_path, "rb")) for image_path in self.subject_image_paths]
            response = requests.post(api_url, data=data, files=files)
            if response.status_code == 201:
                messagebox.showinfo("Success", "Subject data saved successfully!")
            else:
                messagebox.showerror("Error", f"Failed to save data to the server: {response.text}")
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred: {e}")

    def update_data(self):
        subject_id = self.subject_id_var.get()
        subject_gender = self.subject_gender_var.get()
        subject_age = self.subject_age_var.get()
        subject_aadhar_no = self.subject_aadhar_no_var.get()
        subject_latitude = self.subject_latitude_var.get()
        subject_longitude = self.subject_longitude_var.get()

        if not all([subject_id, subject_gender, subject_age, subject_aadhar_no, subject_latitude, subject_longitude, self.subject_image_paths]):
            messagebox.showerror("Error", "Please fill in all fields.")
            return

        user_data_dir = "user_data"
        if not os.path.exists(os.path.join(user_data_dir, subject_id)):
            messagebox.showerror("Error", f"User with ID {subject_id} does not exist.")
            return

        existing_images = os.listdir(os.path.join(user_data_dir, subject_id))
        for image_file in existing_images:
            if image_file.startswith("image_"):
                os.remove(os.path.join(user_data_dir, subject_id, image_file))

        image_urls = []
        for i, image_path in enumerate(self.subject_image_paths):
            image = face_recognition.load_image_file(image_path)
            image_filename = f"image_{i}.jpg"
            image_save_path = os.path.join(user_data_dir, subject_id, image_filename)
            cv2.imwrite(image_save_path, cv2.cvtColor(image, cv2.COLOR_RGB2BGR))
            image_urls.append(image_save_path)

        details_path = os.path.join(user_data_dir, subject_id, "details.json")
        with open(details_path, "r") as details_file:
            user_details = json.load(details_file)
            user_details["gender"] = subject_gender
            user_details["age"] = subject_age
            user_details["aadhar_no"] = subject_aadhar_no
            user_details["latitude"] = subject_latitude
            user_details["longitude"] = subject_longitude

        with open(details_path, "w") as details_file:
            json.dump(user_details, details_file)

        api_url = f"http://127.0.0.1:8000/api/subjectdetails/{subject_id}/"
        try:
            files = [("uploaded_images", open(image_path, "rb")) for image_path in self.subject_image_paths]
            response = requests.put(api_url, data=user_details, files=files)
            if response.status_code == 200:
                messagebox.showinfo("Success", "User data updated successfully!")
            else:
                messagebox.showerror("Error", f"Failed to update data to the server: {response.text}")
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred: {e}")

    def quit_app(self):
        self.video_capture.release()
        self.root.destroy()


import threading


def poll_new_data():
    api_url = "http://127.0.0.1:8000/api/subjectdetails/"
    try:
        response = requests.get(api_url)
        if response.status_code == 200:
            data = response.json()
            for item in data:
                folder_path = os.path.join("user_data", item['id'])
                os.makedirs(folder_path, exist_ok=True)
                json_path = os.path.join(folder_path, "details.json")
                with open(json_path, "w") as json_file:
                    json.dump(item, json_file)

                for image_url in item.get('image_urls', []):
                    image_response = requests.get(image_url, stream=True)
                    if image_response.status_code == 200:
                        image_path = os.path.join(folder_path, os.path.basename(image_url))
                        with open(image_path, "wb") as image_file:
                            shutil.copyfileobj(image_response.raw, image_file)

    except Exception as e:
        print(f"Error while polling new data: {e}")

    threading.Timer(10.0, poll_new_data).start()


if __name__ == "__main__":
    root = tk.Tk()
    app = camS(root)
    poll_new_data()
    root.mainloop()
