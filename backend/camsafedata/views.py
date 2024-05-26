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
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator




@method_decorator(csrf_exempt, name='dispatch')
class GenerateOTP(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        otp = OTP.objects.create(email=email)
        send_mail(
            'Your OTP Code',
            f'Your OTP code is {otp.otp}',
            'your-email@gmail.com',
            [email],
            fail_silently=False,
        )
        
        return Response({'message': 'OTP sent successfully'}, status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class VerifyOTP(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        
        if not email or not otp:
            return Response({'error': 'Email and OTP are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            otp_record = OTP.objects.get(email=email, otp=otp)
        except OTP.DoesNotExist:
            return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
        
        if otp_record.is_valid():
            return Response({'message': 'OTP verified successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'OTP has expired'}, status=status.HTTP_400_BAD_REQUEST)

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

        print("Before saving: ", user.login_status)

        # Update login_status and save the user object
        user.login_status = True
        user.save(update_fields=['login_status'])

        # Debugging line: Print the login_status after saving
        print("After saving: ", user.login_status)
        
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


class UserLogoutAPIView(APIView):
    def post(self, request):
        user_email = request.data.get('email')
        print("user_email", user_email)
        try:
            user = User.objects.get(email=user_email)
            if user.user_role == 'admin':
                return Response({'error': 'Admin cannot be logged out'}, status=400)
            else:
                user.login_status = False
                user.save()
                return Response({'message': 'User logged out successfully'})
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)
   

class UserActivationAPIView(APIView):
    def post(self, request):
        serializer = UserActivationSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                user.is_active = not user.is_active  
                user.save()
                activation_status = "activated" if user.is_active else "deactivated"
                return Response({'message': f'User with email {email} {activation_status} successfully'}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'error': f'User with email {email} does not exist'}, status=status.HTTP_404_NOT_FOUND)
            
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SubjectDetailsListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SubjectDetails.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SubjectDetailsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SubjectDetails.objects.filter(user=self.request.user)

class SubjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SubjectDetails.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
