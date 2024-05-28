import cv2
import os
from fetch import get_user_details
from mail import send_email_with_attachment, fetch_recipient_emails
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor

# Initialize dictionary to keep track of recognized faces and their last recognition time
recognized_faces = {}
last_recognition_time = {}

def recognize_user(model, recipient_emails):
    # Initialize video capture
    video_capture = cv2.VideoCapture(0)

    # Initialize Haar cascade classifier for face detection
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    while True:
        # Capture frame-by-frame
        ret, frame = video_capture.read()

        # Convert frame to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect faces in the frame
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        # Iterate through each detected face
        for (x, y, w, h) in faces:
            # Extract the face region
            face_roi = gray[y:y+h, x:x+w]

            # Recognize the face using the model
            label, confidence = model.predict(face_roi)

            # If confidence is less than 100 (i.e., a match is found)
            if confidence < 100:
                subject_id = label

                if subject_id in last_recognition_time:
                    if datetime.now() - last_recognition_time[subject_id] < timedelta(minutes=15):
                        continue  # Skip sending email if less than 1 hour has passed

                # Fetch user details using ID
                user_details = get_user_details(subject_id)
                if user_details:
                    subject_name = user_details.get("name", "Unknown")
                    subject_gender = user_details.get("gender", "Unknown")
                    subject_age = user_details.get("age", "Unknown")
                    subject_aadhar = user_details.get("aadhar", "Unknown")
                else:
                    subject_name = "Unknown"
                    subject_gender = "Unknown"
                    subject_age = "Unknown"
                    subject_aadhar = "Unknown"

                # Create a directory for the recognized person if it doesn't exist
                person_directory = f"recognized_people/{subject_id}"
                os.makedirs(person_directory, exist_ok=True)

                # Save the captured image with the recognized face in the person's directory
                image_name = f"detected_user_{subject_id}.jpg"
                image_path = os.path.join(person_directory, image_name)
                cv2.imwrite(image_path, frame)

                # Update last recognition time for this person
                last_recognition_time[subject_id] = datetime.now()

                # Send email with details in a separate thread
                with ThreadPoolExecutor() as executor:
                    executor.submit(send_email_with_details, recipient_emails, subject_id, subject_name, subject_gender, subject_age, subject_aadhar, image_path)

            # Draw a rectangle around the face
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

        # Display the resulting frame
        cv2.imshow('Video', frame)

        # Break the loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the video capture object
    video_capture.release()
    cv2.destroyAllWindows()

def send_email_with_details(recipient_emails, subject_id, subject_name, subject_gender, subject_age, subject_aadhar,image_path):
    for recipient_email in recipient_emails:
        send_email_with_attachment(recipient_email, "Subject Recognition Alert",
                                   f"Subject recognized:\nID: {subject_id}\nName: {subject_name}\n", image_path)
                                #    f"Gender: {subject_gender}\nAge: {subject_age}\n"
                                #    f"Aadhar: {subject_aadhar}", image_path)

if __name__ == "__main__":
    # Load the trained face recognition model
    model = cv2.face.LBPHFaceRecognizer_create()
    model.read("face_recognition_model.xml")

    # Get recipient emails from the API
    recipient_emails = fetch_recipient_emails()

    # Recognize users and send email with details
    recognize_user(model, recipient_emails)