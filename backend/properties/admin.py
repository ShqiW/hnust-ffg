from django.contrib import admin
from .models import Property, PropertyImage


class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "location",
        "is_on_campus",
        "price_display",
        "room_type",
        "rental_status",
        "available_from",
    )
    list_filter = ("is_on_campus", "room_type", "rental_status")
    search_fields = ("title", "location", "description")
    inlines = [PropertyImageInline]

    fieldsets = (
        ("基本信息", {"fields": ("title", "location", "is_on_campus", "description")}),
        ("房源详情", {"fields": ("room_type", ("area", "floor"), ("price_min", "price_max"))}),
        ("出租状态", {"fields": ("rental_status", "available_from")}),
        (
            "设施",
            {
                "fields": (
                    ("has_air_conditioning", "has_water_heater", "has_washing_machine"),
                    ("has_refrigerator", "has_tv", "has_wifi"),
                    ("has_bed", "has_desk", "has_wardrobe"),
                )
            },
        ),
    )

    def price_display(self, obj):
        return obj.price_display

    price_display.short_description = "价格"
