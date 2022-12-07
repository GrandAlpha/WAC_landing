from django.urls import path, include
from . import views
from django.views.generic import RedirectView
from django.contrib import auth

urlpatterns = [
    path('', views.home, name='home-page'),
]

urlpatterns += [
    path('accounts/', include('django.contrib.auth.urls')),
]
