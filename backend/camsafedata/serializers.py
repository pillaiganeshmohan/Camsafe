# serializers.py
from rest_framework import serializers
from .models import Subject, CCTVIdentityMaster, CcTVIdentityTransaction
from .models import AdminIdentity,UserIdentity,FeatureData,ContactUs,SubjectHistory
from django.contrib.auth import authenticate


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
            else:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Must include "email" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs