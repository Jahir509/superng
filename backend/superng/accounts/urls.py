from django.urls import path
from .views import user_list_create, user_detail
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/users/', user_list_create, name='user_list_create'),
    path('api/users/<int:pk>/', user_detail, name='user_detail'),
]
