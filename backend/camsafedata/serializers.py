# serializers.py
from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class OTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = OTP
        fields = ['email', 'otp']

from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

class MyTokenObtainPairSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        max_length=128,
        write_only=True,
        style={'input_type': 'password'}
    )
    token = serializers.CharField(max_length=255, read_only=True)
    name = serializers.CharField(max_length=255, read_only=True)  # Add name field

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'),
                                email=email, password=password)

            if not user:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')

            if not user.is_active:
                msg = 'User account is disabled.'
                raise serializers.ValidationError(msg, code='authorization')

        else:
            msg = 'Must include "email" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        refresh = RefreshToken.for_user(user)
        print("Before saving: ", user.login_status)
        user.login_status = True
        user.save(update_fields=['login_status'])
        print("After saving: ", user.login_status)
        
        attrs['name'] = f"{user.name}"
        attrs['token'] = {
            'name': attrs['name'],
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
          # Add the user's name to the response
        return attrs['token']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name', 'address', 'age', 'gender', 'offence', 'aadhar_no', 'date', 'day', 'longitude', 'latitude', 'image', 'user']


class CCTVIdentityMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CCTVIdentityMaster
        fields = '__all__'

class SubjectHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubjectHistory
        fields= '__all__'
class AdminIdentitySerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminIdentity
        fields = '__all__'

class UserIdentitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserIdentity
        fields = '__all__'

class CcTVIdentityTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CcTVIdentityTransaction
        fields = '__all__'

class FeatureDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureData
        fields = '__all__'

class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = '__all__'

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)

            if user:
                if not user.is_active:
                    msg = 'User account is disabled.'
                    raise serializers.ValidationError(msg, code='authorization')
                # Update login_status to True if the user is successfully authenticated
                
            else:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Must include "email" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        
        return attrs
    
    
class UserActivationSerializer(serializers.Serializer):
    email = serializers.EmailField()



class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=128,
        write_only=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ('email', 'password', 'user_role', 'police_station_code', 'police_station_name', 'state', 'district', 'taluka', 'pin_code', 'location', 'thane_incharge','contact_no','name')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user



# SUBJECT DETAIL VIEW & HISTORY PAGE
class ProImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProImage
        fields = ['id', 'image']

class ProductSerializer(serializers.ModelSerializer):
    images = ProImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=100000000, allow_empty_file=False, use_url=False),
        write_only=True
    )

    class Meta:
        model = SubjectDetails
        fields = ['id', 'name', 'address', 'age', 'date', 'longitude', 'latitude', 'images', 'master_front_profile', 'uploaded_images']

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        product = SubjectDetails.objects.create(**validated_data)
        for image in uploaded_images:
            ProImage.objects.create(product=product, image=image)
        return product

    def update(self, instance, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        instance = super().update(instance, validated_data)
        if uploaded_images:
            for image in uploaded_images:
                ProImage.objects.create(product=instance, image=image)
        return instance