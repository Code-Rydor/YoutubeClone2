from django.urls import path, include
from comments import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.user_comments),
    path('<str:video_id>/', views.get_all_comments),
    path("<str:video_id>/<int:pk>", views.user_comments),
]
