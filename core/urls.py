from django.urls import path
from .views import index, about, contact, events, members, blog, blog_detail, event_detail

urlpatterns = [
    path('', index, name='home'),
    path('about/', about, name='about'),
    path('contact/', contact, name='contact'),
    path('events/', events, name='events'),
    path('events/<slug:slug>/', event_detail, name='event_detail'),
    path('members/', members, name='members'),
    path('blog/', blog, name='blog'),
    path('blog/<slug:slug>/', blog_detail, name='blog_detail'),
]