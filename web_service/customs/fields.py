from typing import Iterable, Optional
from rest_framework import serializers


class ObjectSerializer(serializers.Serializer):
    id = serializers.IntegerField()

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass


class ObjectField(serializers.Field):

    def __init__(self, serializer, fields_to_display: Optional[Iterable] = None, **kwargs):
        self.serializer = serializer
        self.fields_to_display = fields_to_display
        if self.serializer is None:
            raise ValueError('Serializer required')
        super().__init__(**kwargs)

    def to_internal_value(self, data):
        object_serializer = ObjectSerializer(data=data)
        object_serializer.is_valid(raise_exception=True)
        return data['id']

    def to_representation(self, value):
        model_class = self.serializer.Meta.model
        instance = model_class.objects.get(pk=value)
        data_for_serializer = {"instance": instance}
        if self.fields_to_display:
            data_for_serializer["fields"] = self.fields_to_display
        return self.serializer(**data_for_serializer).data
