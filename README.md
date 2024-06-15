# Camsafe

CAMSAFE a real-time subject face recognition is a dynamic system designed to rapidly identify and match faces against a database of known subjects. This involves curating a comprehensive subject dataset, preprocessing facial images for uniformity, and selecting an effective face recognition model. Integration with real-time face detection enables the system to operate seamlessly on pictures from live or recorded video streams. Setting appropriate recognition thresholds ensures a balance between sensitivity and specificity, and an admin interface will be implemented for authorized personnel interaction. Multiple factors like, birthmark, facial features, expressions and predicted data of different age groups for the same subject will be considered. Upon deployment, continuous monitoring and updates are crucial to maintain accuracy, and legal and ethical considerations must be addressed to comply with regulations and safeguard privacy. Robust security measures will be implemented to prevent unauthorized access, recognizing the sensitivity of the information involved. While promising for enhancing public safety, the responsible deployment of real-time subject face recognition necessitates careful ethical considerations and a commitment to privacy preservation.

# Run Frontend

### `cd frontend`

### `npm install`

### `npm start`

## Frontend will be hosted on below link

### `http://localhost:3000/`

# Run Backend

### `cd backend`

### `virtualenv venv`

### `.\venv\Scripts\activate`

### `pip install -r requirements.txt`

### `daphne -b 127.0.0.1 -p 8000 camsafe.asgi:application`

## Backend will be hosted on below link

### `http://127.0.0.1:8000/`

# Run ML

### `cd ml`

### `virtualenv env`

### `.\env\Scripts\activate`

### `pip install .\dlib-19.24.99-cp312-cp312-win_amd64.whl`

### `pip install -r requirements.txt`

## To Register the Data

### `python main.py`

## To Run the Model

### `python master.py`
