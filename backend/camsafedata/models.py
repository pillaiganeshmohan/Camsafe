from django.db import models

class Subject(models.Model):
    SI_subject_id = models.IntegerField(primary_key=True)
    SI_subject_name = models.CharField(max_length=50)
    SI_subject_address = models.CharField(max_length=200)
    SI_subject_age = models.IntegerField()
    SI_subject_gender = models.CharField(max_length=10)
    SI_subject_offence = models.CharField(max_length=100)
    SI_front_profile = models.CharField(max_length=1000)
    SI_left_profile = models.CharField(max_length=1000)
    SI_right_profile = models.CharField(max_length=1000)
    SI_iris = models.CharField(max_length=1000)
    def __str__(self):
        return f"{self.SI_subject_id}-{self.SI_subject_name}"

class SubjectHistory(models.Model):
    SH_subject_id = models.IntegerField(primary_key=True)
    SH_subject_name = models.CharField(max_length=50)
    SH_camera_location_name = models.CharField(max_length=50)
    SH_date = models.CharField(max_length=20)
    SH_day = models.CharField(max_length=20)
    SH_footage_id = models.CharField(max_length = 20)
    SH_camera_id = models.CharField(max_length=15)

    def _str_(self):
        return f"{self.SH_subject_id}-{self.SH_subject_name}"

class CCTVIdentityMaster(models.Model):
    camera_location_name = models.CharField(max_length=50)
    camera_number = models.IntegerField()
    camera_brand = models.CharField(max_length=20)
    country = models.CharField(max_length=25)
    state = models.CharField(max_length=40)
    district = models.CharField(max_length=40)
    taluka = models.CharField(max_length=40)
    pin_code = models.IntegerField(max_length=6)
    address = models.CharField(max_length=200)
    camera_id = models.CharField(max_length=15, primary_key=True)
    city = models.CharField(max_length=25)
    latitude = models.IntegerField()
    longitude = models.IntegerField()

    def __str__(self):
        return self.camera_location_name


class AdminIdentity(models.Model):
    admin_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    contactNumber = models.IntegerField()
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    policeStationName = models.CharField(max_length=50)
    policeStationCode = models.CharField(max_length=10)
    thanaIncharge = models.CharField(max_length=50)
    location = models.CharField(max_length=250)
    pinCode = models.IntegerField()
    state = models.CharField(max_length=25)
    district = models.CharField(max_length=25)
    taluka = models.CharField(max_length=25)

    
 

   
    
    

    def __str__(self):
        return self.name

class UserIdentity(models.Model):
    userid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    contactNumber = models.IntegerField(max_length=10)
    password = models.CharField(max_length=50)
    policeCenterCode = models.IntegerField()
    

    def __str__(self):
        return f"{self.name}"

class CcTVIdentityTransaction(models.Model):
    CTVIT_camera_number = models.IntegerField(max_length=20)
    CTVIT_date_day = models.CharField(max_length=20)
    CTVIT_footage_id = models.CharField(max_length = 20,primary_key=True)
    CTVIT_footage = models.CharField(max_length=1000)
    # CTVIT_camera_id = models.CharField(max_length=20)
    CTVIT_camera_id = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.CTVIT_camera_id}-{self.CTVIT_footage_id}"

class FeatureData(models.Model):
    FT_feature_id = models.CharField(max_length=50, primary_key=True)
    FT_subject_id = models.CharField(max_length=50)
    FT_left_eye = models.CharField(max_length=50)
    FT_right_eye = models.CharField(max_length=1000)
    FT_nose = models.CharField(max_length=1000)
    FT_lips = models.CharField(max_length=1000)
    FT_left_eyebrow = models.CharField(max_length=1000)
    FT_right_eyebrow = models.CharField(max_length=1000)
    FT_left_ear = models.CharField(max_length=1000)
    FT_right_ear = models.CharField(max_length=1000)
    FT_hair_color = models.CharField(max_length=1000)
    FT_eye_color = models.CharField(max_length=1000)
    FT_beard = models.CharField(max_length=1000)
    FT_mustache = models.CharField(max_length=1000)
    FT_mole = models.CharField(max_length=1000)
    FT_birth_mark = models.CharField(max_length=1000)
    FT_hair = models.CharField(max_length=1000)

    def __str__(self):
        return f"{self.FT_feature_id}-{self.FT_subject_id}"


class ContactUs(models.Model):
    name = models.CharField(max_length=50)  # Change field name from CU_fname to fname
    lastname = models.CharField(max_length=50)  # Change field name from CU_lname to lname
    email = models.EmailField(max_length=50, primary_key=True)  # Change field name from CU_email to email
    message = models.CharField(max_length=100)  # Change field name from CU_desc to desc

    def __str__(self):
        return f"{self.name} {self.lastname}"