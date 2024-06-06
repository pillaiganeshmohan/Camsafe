# yourapp/routing.py

from django.urls import path
from camsafedata import consumers

websocket_urlpatterns = [
    path('ws/test/', consumers.NotificationConsumer.as_asgi()),
]
