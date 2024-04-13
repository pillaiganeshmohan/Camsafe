# serializers.py
from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class MyTokenObtainPairSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        max_length=128,
        write_only=True,
        style={'input_type': 'password'}
    )
    token = serializers.CharField(max_length=255, read_only=True)

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
        attrs['token'] = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
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
        fields = '__all__'

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
        fields = ('email', 'password', 'user_role', 'police_station_code', 'police_station_name', 'state', 'district', 'taluka', 'pin_code', 'location', 'thane_incharge','username')
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user