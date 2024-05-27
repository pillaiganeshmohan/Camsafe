import yagmail
import os
import datetime
import requests
from location import fetch_camera_details

def fetch_recipient_emails():
    api_url = 'http://127.0.0.1:8000/api/users/'
    try:
        response = requests.get(api_url)
        
        if response.status_code == 200:
            recipients_data = response.json()
            # Filter to get only admin users
            admin_emails = [user['email'] for user in recipients_data if user['user_role'] == 'admin']
            return admin_emails
        else:
            print("Failed to fetch recipients from API", response.status_code)
            return []
    except Exception as e:
        print("Error:", e)
        return []

def send_email_with_attachment(receiver, subject, body, attachment_path):
    date = datetime.date.today().strftime("%B %d, %Y")
    
    # Mail information
    yag = yagmail.SMTP("camsafepasta@gmail.com", "mhca bbyy jqfc sabo")

    # Send the email to recipients using location details
    
    camera_details = fetch_camera_details()
  
    
    send_email_with_location(receiver, "Subject Recognition Alert", body, attachment_path, camera_details)
    
    
    print("Email Sent!")

def send_email_with_location(receiver, subject, body, attachment_path, camera_details):
    # Append camera details to the email body
    body_with_location = f"{body}\n\nCamera Details:\n{camera_details}"
    
    # Mail information
    yag = yagmail.SMTP("camsafepasta@gmail.com", "mhca bbyy jqfc sabo")

    # Send the mail
    yag.send(
        to=receiver,
        subject=subject,
        contents=body_with_location,
        attachments=[attachment_path]
    )

    print("Email with location Sent!")
