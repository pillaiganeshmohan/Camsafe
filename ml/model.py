import cv2
import os
import numpy as np

def train_face_recognition_model(data_dir):
    # Initialize lists to store face encodings and corresponding labels
    face_encodings = []
    labels = []

    # Create LBPH face recognizer
    face_recognizer = cv2.face.LBPHFaceRecognizer_create()

    # Initialize Haar cascade classifier for face detection
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    # Iterate through each subdirectory (each containing images of a single person)
    for label in os.listdir(data_dir):
        label_dir = os.path.join(data_dir, label)
        
        # Skip if the item in the directory is not a directory
        if not os.path.isdir(label_dir):
            continue

        # Extract subject ID from the label
        subject_id = int(label.split('-')[0])

        # Iterate through each image in the subdirectory
        for image_file in os.listdir(label_dir):
            image_path = os.path.join(label_dir, image_file)

            # Read the image in grayscale
            image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

            # Detect faces in the image
            faces = face_cascade.detectMultiScale(image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

            # Iterate through each detected face
            for (x, y, w, h) in faces:
                # Extract the face region
                face_roi = image[y:y+h, x:x+w]

                # Append the face encoding and label to the lists
                face_encodings.append(face_roi)
                labels.append(subject_id)

    # Train the LBPH face recognizer
    face_recognizer.train(face_encodings, np.array(labels))

    return face_recognizer

if __name__ == "__main__":
    data_directory = "user_data"
    model = train_face_recognition_model(data_directory)

    # Save the trained model
    model.save("face_recognition_model.xml")