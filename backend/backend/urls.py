from django.urls import path
from django.contrib import admin
from rest_framework.authtoken import views as auth_views
from .views import InterestView, LikeView, LocationView, RegisterView, GroupView, ProfileView, GroupDetailView, TagView, UsersView, AllGroupsView

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path("login/", auth_views.obtain_auth_token, name="login"),
    path("register/", RegisterView.as_view(), name="register"),
    path("group/", GroupView.as_view(), name="group"),
    path("all_groups/<int:pk>", AllGroupsView.as_view(), name="allGroups"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("group/<int:pk>/", GroupDetailView.as_view(), name="group_detail"),
    path("tags/", TagView.as_view(), name="tags"),
    path("interests/", InterestView.as_view(), name="interests"),
    path("locations/", LocationView.as_view(), name="locations"),
    path("users", UsersView.as_view(), name="users"),
    path("like/<int:pk>/", LikeView.as_view(), name="like"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
