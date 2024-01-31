from django.urls import include, path
from rest_framework import routers

from service import views

router = routers.DefaultRouter()
router.register(r'car_model', views.CarModelViewSet)
router.register(r'acceptor', views.AcceptorViewSet)
router.register(r'car', views.CarViewSet)
router.register(r'registration', views.RegistrationViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('maintenance/', views.MaintenanceView.as_view(), name='maintenance'),
    path('engine/', views.EngineView.as_view(), name='engine'),
]

urlpatterns += router.urls
