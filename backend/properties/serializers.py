from rest_framework import serializers
from .models import Property, PropertyImage, PropertyFacility, Contact


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["id", "image", "is_main"]


class PropertyFacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyFacility
        fields = ["id", "name"]


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ["id", "name", "phone", "email"]


class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    facilities = PropertyFacilitySerializer(many=True, read_only=True)
    contacts = ContactSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = [
            "id",
            "title",
            "location",
            "is_on_campus",
            "price",
            "price_unit",
            "available_from",
            "room_type",
            "area",
            "description",
            "images",
            "facilities",
            "contacts",
            "created_at",
            "updated_at",
        ]
