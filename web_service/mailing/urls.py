from django.urls import include, path

from mailing import views




# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('send_mail/', views.MailingCreateView.as_view(), name='mailing'),
]
