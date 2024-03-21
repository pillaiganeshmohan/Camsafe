from rest_framework import status

from rest_framework import generics
from .models import Subject
from .serializers import SubjectSerializer
from .models import CCTVIdentityMaster
from .serializers import CCTVIdentityMasterSerializer
from .models import AdminIdentity
from .serializers import AdminIdentitySerializer
from .models import UserIdentity
from .serializers import UserIdentitySerializer
from .models import CcTVIdentityTransaction
from .serializers import CcTVIdentityTransactionSerializer
from .models import FeatureData
from .serializers import FeatureDataSerializer
from .models import ContactUs
from .serializers import ContactUsSerializer
from .models import SubjectHistory
from .serializers import SubjectHistorySerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserLoginSerializer

#
class SubjectList(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class SubjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class SubjectHistoryList(generics.ListCreateAPIView):
    queryset = SubjectHistory.objects.all()
    serializer_class = SubjectHistorySerializer

class SubjectHistoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SubjectHistory.objects.all()
    serializer_class = SubjectHistorySerializer

class CCTVIdentityMasterList(generics.ListCreateAPIView):
    queryset = CCTVIdentityMaster.objects.all()
    serializer_class = CCTVIdentityMasterSerializer

class CCTVIdentityMasterDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CCTVIdentityMaster.objects.all()
    serializer_class = CCTVIdentityMasterSerializer

# class AdminIdentityList(generics.ListCreateAPIView):
#     queryset = AdminIdentity.objects.all()
#     serializer_class = AdminIdentitySerializer

class AdminIdentityCreateView(generics.CreateAPIView):
    queryset = AdminIdentity.objects.all()
    serializer_class = AdminIdentitySerializer

class AdminIdentityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = AdminIdentity.objects.all()
    serializer_class = AdminIdentitySerializer

class UserIdentityCreateView(generics.CreateAPIView):
    queryset = UserIdentity.objects.all()
    serializer_class = UserIdentitySerializer

class UserIdentityDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserIdentity.objects.all()
    serializer_class = UserIdentitySerializer

class CcTVIdentityTransactionList(generics.ListCreateAPIView):
    queryset = CcTVIdentityTransaction.objects.all()
    serializer_class = CcTVIdentityTransactionSerializer

class CcTVIdentityTransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CcTVIdentityTransaction.objects.all()
    serializer_class = CcTVIdentityTransactionSerializer

class FeatureDataList(generics.ListCreateAPIView):
    queryset = FeatureData.objects.all()
    serializer_class = FeatureDataSerializer

class FeatureDataDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FeatureData.objects.all()
    serializer_class = FeatureDataSerializer

class ContactUsCreateView(generics.CreateAPIView):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer

class ContactUsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer


class UserLoginAPIView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        refresh = RefreshToken.for_user(user)
    
        
        return Response({"message": "Login successful", 'refresh': str(refresh),'access': str(refresh.access_token),}, status=status.HTTP_200_OK)