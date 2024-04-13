from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.core.exceptions import ValidationError
import uuid,os

class UserManager(BaseUserManager):
    def create_user(self, email, password, user_role='user', **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, user_role=user_role, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, user_role='admin', **extra_fields)

class User(AbstractUser):
    email = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)
    user_role = models.CharField(max_length=100, choices=[('user', 'User'), ('admin', 'Admin')], default='user')
    police_station_code = models.CharField(max_length=100)
    police_station_name = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    taluka = models.CharField(max_length=100)
    pin_code = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    thane_incharge = models.CharField(max_length=255)
    login_status = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    REQUIRED_FIELDS = []
    USERNAME_FIELD = 'email'

    objects = UserManager()

    def clean(self):
        super().clean()
        if self.user_role not in ['user', 'admin']:
            raise ValidationError({'user_role': 'User role must be either "user" or "admin".'})

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name="user_profile")
    phone = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email



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
    name = models.CharField(max_length=50) 
    lastname = models.CharField(max_length=50) 
    email = models.EmailField(max_length=50, primary_key=True) 
    message = models.CharField(max_length=100) 

    def __str__(self):
        return f"{self.name} {self.lastname}"


       
        # SUBJECT DETAIL VIEW & HISTORY
def upload_path(instance, filename):
    return os.path.join('master_front_profile', str(instance.id), filename)

class SubjectDetails(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, unique=True)
    name = models.CharField(max_length=200)
    address = models.TextField(blank=True, null=True)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    offence = models.CharField(max_length=200)
    aadhar_no = models.BigIntegerField(null=True, default=None)
    date = models.DateField(null=True)
    day = models.CharField(max_length=20)
    longitude = models.CharField(max_length=30)
    latitude = models.CharField(max_length=30)
    image = models.ImageField(upload_to = 'img',  blank = True, null=True, default='')
    master_front_profile = models.ImageField(upload_to=upload_path, blank=True, null=True)

    def __str__(self):
        return self.name

class ProImage(models.Model):
    product = models.ForeignKey(SubjectDetails, on_delete=models.CASCADE, related_name = "images")
    image = models.ImageField(upload_to = 'img',  blank = True, null=True, default='')