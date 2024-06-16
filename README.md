# Camsafe

Camsafe, a real-time criminal face recognition is a dynamic system designed to rapidly identify and match faces against a database of known criminals. This involves curating a comprehensive criminal dataset, preprocessing facial images for uniformity, and selecting an effective face recognition model. Integration with real-time face detection enables the system to operate seamlessly on pictures from live or recorded video streams. Setting appropriate recognition thresholds ensures a balance between sensitivity and specificity, and an admin interface will be implemented for police interaction. Multiple factors like, birthmark, facial features, expressions and predicted data of different age groups for the same criminal will be considered. Upon deployment, continuous monitoring and updates are crucial to maintain accuracy, and legal and ethical considerations must be addressed to comply with regulations and safeguard privacy. Robust security measures will be implemented to prevent unauthorized access, recognizing the sensitivity of the information involved. While promising for enhancing public safety, the responsible deployment of Camsafe necessitates careful ethical considerations and a commitment to privacy preservation.

***Key Features:***  

1. Police enters database of criminals
2. System does facial recognition of the criminals as per the database given by the police
3. Displays the status and details of the criminal to the police
4. Notifies the police if criminal is detected on the system
5. Admin verifies and approves the registration of police

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

### `python manage.py makemigrations`

### `python manage.py migrate`

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

## Screenshots

![1](https://github.com/pillaiganeshmohan/Camsafe/assets/68379838/6ce98e7b-457e-4c9d-b8e5-b2e3b355f82e)

![2](https://github.com/pillaiganeshmohan/Camsafe/assets/68379838/f684bef3-ea05-44e0-a33a-b872097729be)

![3](https://github.com/pillaiganeshmohan/Camsafe/assets/68379838/8131b670-fa33-405e-9f78-73b89962f679)

![4](https://github.com/pillaiganeshmohan/Camsafe/assets/68379838/dadaeb36-9ab6-4290-9702-87b2854f1061)

![5](https://github.com/pillaiganeshmohan/Camsafe/assets/68379838/15149724-5491-4ae2-9edf-530d6667f805)

![6](https://github.com/pillaiganeshmohan/Camsafe/assets/68379838/2329c248-9a5b-4d66-b3cf-1f458d6e9c68)

![7](https://github.com/pillaiganeshmohan/Camsafe/assets/68379838/e8ac3d85-acb5-4c1f-898a-f48b0c5c51d5)

![8](https://github.com/pillaiganeshmohan/Camsafe/assets/68379838/f0a99975-fb85-43b2-9b7a-c548e0716196)

![9](https://github.com/pillaiganeshmohan/Camsafe/assets/68379838/27b9554a-896c-4794-8e67-be8cf2d6d15c)

![10](https://github.com/pillaiganeshmohan/Camsafe/assets/68379838/72d00a5e-4504-4069-9b82-2ef9f8162eee)

![11](https://github.com/pillaiganeshmohan/Camsafe/assets/68379838/825c5ab5-26c9-4693-a52f-f8c4c6bd607e)

![12](https://github.com/pillaiganeshmohan/Camsafe/assets/68379838/88a9a56d-100f-4a27-b5a2-c7f39a07d185)

![13](https://github.com/pillaiganeshmohan/Camsafe/assets/68379838/5d1f1166-f15a-451f-8069-f60b5f97754f)

![14](https://github.com/pillaiganeshmohan/Camsafe/assets/68379838/9869502e-ad0e-4d07-9e64-ca1aacc3adf3)
