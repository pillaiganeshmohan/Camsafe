from django.urls import path
from .views import SubjectList, SubjectDetail, CCTVIdentityMasterList, CCTVIdentityMasterDetail, AdminIdentityDetail
from .views import UserIdentityDetailView, CcTVIdentityTransactionList, CcTVIdentityTransactionDetailView,SubjectHistoryList, SubjectHistoryDetail
from .views import FeatureDataList, FeatureDataDetailView
from .views import UserIdentityCreateView,AdminIdentityCreateView,ContactUsCreateView,UserLoginAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
#AdminIdentityList, UserIdentityList

urlpatterns = [
    path('subject-history/', SubjectHistoryList.as_view(), name='subject-history-list'),
    path('subject-history/<int:pk>/', SubjectHistoryDetail.as_view(), name='subject-history-detail'),
    path('subjects/', SubjectList.as_view(), name='subject-list'),
    path('subjects/<int:pk>/', SubjectDetail.as_view(), name='subject-detail'),
    path('cctv-identity-masters/', CCTVIdentityMasterList.as_view(), name='cctv-identity-master-list'),
    path('cctv-identity-masters/<str:pk>/', CCTVIdentityMasterDetail.as_view(), name='cctv-identity-master-detail'),
    # path('admin-identities/', AdminIdentityList.as_view(), name='admin-identity-list'),
    # path('admin-identities/<int:pk>/', AdminIdentityDetail.as_view(), name='admin-identity-detail'),
    path('admin-identity/', AdminIdentityCreateView.as_view(), name='admin-identity-create'),
    # path('user_identities/', UserIdentityList.as_view(), name='user-identity-list'),
    path('user_identity/', UserIdentityCreateView.as_view(), name='user-identity-signup'),
    path('user_identities/<int:pk>/', UserIdentityDetailView.as_view(), name='user-identity-detail'),
    path('cctv_transactions/', CcTVIdentityTransactionList.as_view(), name='cctv-identity-transaction-list'),
    path('cctv_transactions/<int:pk>/', CcTVIdentityTransactionDetailView.as_view(), name='cctv-identity-transaction-list'),
    path('feature_data/', FeatureDataList.as_view(), name='feature-data-list'),
    path('feature_data/<int:pk>/', FeatureDataDetailView.as_view(), name='feature-data-list'),
    path('contact_us/', ContactUsCreateView.as_view(), name='contact-us-data'),
    path('contact_us/<int:pk>/', FeatureDataDetailView.as_view(), name='contact-us-data'),
     path('token/', UserLoginAPIView.as_view(), name='token_obtain_pair'),
]

