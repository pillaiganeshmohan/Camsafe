from django.http import HttpResponse
from rest_framework import status
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import viewsets
from .models import User, SubjectDetails
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
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




class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

User = get_user_model()

class UserActivationAPIView(APIView):
    def post(self, request):
        serializer = UserActivationSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                user.is_active = not user.is_active  # Toggle the is_active field
                user.save()
                activation_status = "activated" if user.is_active else "deactivated"
                return Response({'message': f'User with email {email} {activation_status} successfully'}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'error': f'User with email {email} does not exist'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# SUBJECT DETAIL  & HISTORY PAGE
class SubjectDetailsListCreateView(generics.ListCreateAPIView):
    queryset = SubjectDetails.objects.all()
    serializer_class = ProductSerializer

class SubjectDetailsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SubjectDetails.objects.all()
    serializer_class = ProductSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = SubjectDetails.objects.all()
    serializer_class = ProductSerializer

    def post(self, request, *args, **kwargs):
        master_front_profile = request.data['master_front_profile']
        id = request.data['subject_id']
        SubjectDetails.objects.create(id=id, master_front_profile=master_front_profile)
        return HttpResponse({'message':'Image Done'}, status = 200)
