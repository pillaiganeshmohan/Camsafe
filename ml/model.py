import os
import numpy as np
import logging
import cv2

def setup_logging():
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def augment_image(image):
    if image is None:
        return None

    try:
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
    except Exception as e:
        logging.error(f"Error augmenting image: {e}")
        return None

    return image

def detect_faces(image, face_cascade):
    try:
        faces = face_cascade.detectMultiScale(image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        return faces
    except Exception as e:
        logging.error(f"Error detecting faces: {e}")
        return []

def extract_face_encodings(data_dir):
    face_encodings = []
    labels = []
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    for label in os.listdir(data_dir):
        label_dir = os.path.join(data_dir, label)
        if not os.path.isdir(label_dir):
            continue

        try:
            subject_id, aadhar_no = label.split('-')  # Assuming subject ID and Aadhar number are separated by '-'
        except ValueError as e:
            logging.warning(f"Skipping label {label}: {e}")
            continue

        for image_file in os.listdir(label_dir):
            image_path = os.path.join(label_dir, image_file)
            image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

            if image is None:
                logging.warning(f"Could not read image {image_path}")
                continue

            augmented_image = augment_image(image)
            if augmented_image is None:
                continue

            faces = detect_faces(augmented_image, face_cascade)
            for (x, y, w, h) in faces:
                face_roi = augmented_image[y:y+h, x:x+w]
                face_encodings.append(face_roi)
                labels.append((subject_id, aadhar_no))

                # If face detected, upload the image to SubjectDetails API

    return face_encodings, labels


def train_face_recognition_model(data_dir):
    face_encodings, labels = extract_face_encodings(data_dir)
    if not face_encodings or not labels:
        logging.error("No face encodings or labels found. Exiting.")
        return None

    face_recognizer = cv2.face.LBPHFaceRecognizer_create()
    face_recognizer.train(face_encodings, np.array(labels))

    return face_recognizer

if __name__ == "__main__":
    setup_logging()
    data_directory = r"user_data"
    model = train_face_recognition_model(data_directory)

    if model:
        model.save("face_recognition_model.xml")
        logging.info("Model saved successfully.")
    else:
        logging.error("Model training failed.")
