from django.urls import path, include
from . import views
from django.views.generic import RedirectView
from django.contrib import auth

urlpatterns = [
    path('account/', views.account, name='account'),
    path('', views.home, name='home-page')
]
