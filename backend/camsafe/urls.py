from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from camsafe import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('camsafedata.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
