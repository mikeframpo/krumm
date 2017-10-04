
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^id/(?P<creep_id>[0-9]+)$', views.creep_by_id)
]

