# serializers.py
from rest_framework import serializers
from .models import Subject, CCTVIdentityMaster, CcTVIdentityTransaction
from .models import AdminIdentity,UserIdentity,FeatureData,ContactUs,SubjectHistory


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