from django.db.models import QuerySet
from django_filters import rest_framework as filters

from service.models import Registration


class RegistrationFilter(filters.FilterSet):
    for_me = filters.CharFilter(method='get_filter_for_me')

    def get_filter_for_me(self, queryset: QuerySet[Registration], *args) -> QuerySet[Registration]:
        return queryset.filter(car__owner_id=self.request.user.id)

    class Meta:
        model = Registration
        fields = ['day',
                  'acceptor_id',
                  'for_me']
