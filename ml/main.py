import cv2
import tkinter as tk
from capture import camS
from master import recognize_user
from model import train_face_recognition_model

def main():
    while True:
        # Create a menu for user selection
        print("\nWelcome to the Face Recognition System!")
        print("1. Capture")
        print("2. Train")
        print("3. Recognize")
        print("4. Exit")

        choice = input("Enter your choice (1, 2, 3, or 4): ")

        if choice == '1':
            # Capture option
            root = tk.Tk()
            app = camS(root)
            root.mainloop()
        elif choice == '2':
            # Train option
            data_directory = "user_data/"
            model = train_face_recognition_model(data_directory)
            print("Training completed. Model saved as 'face_recognition_model.xml'.")
        elif choice == '3':
            # Recognize option
            if 'model' not in locals():
                print("Error: Please train the model first before recognizing.")
            else:
                recognize_user(model)
        elif choice == '4':
            # Exit option
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please enter 1, 2, 3, or 4.")

if __name__ == "__main__":
    main()
