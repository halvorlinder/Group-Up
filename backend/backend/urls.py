from django.urls import path
from django.contrib import admin
from rest_framework.authtoken import views as auth_views
from .views import RegisterView, GroupView, UserView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("login/", auth_views.obtain_auth_token, name="login"),
    path("register/", RegisterView.as_view(), name="register"),
    path("group/", GroupView.as_view(), name="group"),
    path("user/", UserView.as_view(), name="user"),
]
