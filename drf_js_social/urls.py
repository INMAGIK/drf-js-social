from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.conf import settings

from .views import TokenPopView, CurrentUserView


urlpatterns = patterns('',

    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'^popuptoken/$', TokenPopView.as_view(), name="popuptoken"),
    url(r'^me/$', CurrentUserView.as_view(), name="me"),

)
