from rest_framework import serializers
from .models import Property, PropertyImage


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["id", "image", "is_main"]


class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    price_display = serializers.CharField(read_only=True)
    room_type_display = serializers.CharField(source="get_room_type_display", read_only=True)
    rental_status_display = serializers.CharField(source="get_rental_status_display", read_only=True)

    # 前端兼容字段
    campus = serializers.CharField(source="location", read_only=True)
    price = serializers.DecimalField(source="price_min", max_digits=10, decimal_places=0, read_only=True)
    is_available = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = [
            "id",
            "title",
            "location",
            "campus",  # 前端使用
            "is_on_campus",
            "price_min",
            "price_max",
            "price",  # 前端使用
            "price_display",
            "available_from",
            "room_type",
            "room_type_display",
            "rental_status",
            "rental_status_display",
            "is_available",  # 前端使用
            "area",
            "floor",
            "description",
            "images",
            # 设施
            "has_air_conditioning",
            "has_water_heater",
            "has_washing_machine",
            "has_refrigerator",
            "has_tv",
            "has_wifi",
            "has_bed",
            "has_desk",
            "has_wardrobe",
            "created_at",
            "updated_at",
        ]

    def get_is_available(self, obj):
        return obj.rental_status == "available"
