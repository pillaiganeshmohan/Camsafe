import cv2
import os
import numpy as np

def augment_image(image):
    if image is None:
        return None

    # Randomly rotate the image
    angle = np.random.randint(-15, 15)
    rows, cols = image.shape
    M = cv2.getRotationMatrix2D((cols / 2, rows / 2), angle, 1)
    image = cv2.warpAffine(image, M, (cols, rows))

    # Randomly flip the image horizontally
    if np.random.rand() < 0.5:
        image = cv2.flip(image, 1)

    # Randomly adjust brightness
    brightness_factor = 0.8 + np.random.rand() * 0.4  # Random brightness between 0.8 and 1.2
    image = cv2.convertScaleAbs(image, alpha=brightness_factor, beta=0)

    return image

def extract_face_encodings(data_dir):
    # Initialize lists to store face encodings and corresponding labels
    face_encodings = []
    labels = []

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

            # Augment the image
            augmented_image = augment_image(image)

            if augmented_image is None:
                continue

            # Detect faces in the image
            faces = face_cascade.detectMultiScale(augmented_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

            # Iterate through each detected face
            for (x, y, w, h) in faces:
                # Extract the face region
                face_roi = augmented_image[y:y+h, x:x+w]

                # Append the face encoding and label to the lists
                face_encodings.append(face_roi)
                labels.append(subject_id)

    return face_encodings, labels

def train_face_recognition_model(data_dir):
    # Extract face encodings and labels
    face_encodings, labels = extract_face_encodings(data_dir)

    # Create LBPH face recognizer
    face_recognizer = cv2.face.LBPHFaceRecognizer_create()

    # Train the LBPH face recognizer
    face_recognizer.train(face_encodings, np.array(labels))

    return face_recognizer

if __name__ == "__main__":
    data_directory = "user_data"
    model = train_face_recognition_model(data_directory)

    # Save the trained model
    model.save("face_recognition_model.xml")