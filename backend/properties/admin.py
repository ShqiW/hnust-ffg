from django.contrib import admin
from .models import Property, PropertyImage, Inquiry


class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "zone",
        "room_number",
        "is_on_campus",
        "price_display",
        "room_type",
        "bathroom_type",
        "rental_status",
        "available_from",
    )
    list_filter = ("zone", "is_on_campus", "room_type", "bathroom_type", "gender_restriction", "rental_status")
    search_fields = ("title", "location", "room_number", "description")
    inlines = [PropertyImageInline]

    fieldsets = (
        ("基本信息", {
            "fields": (
                "title",
                ("zone", "location"),
                ("room_number", "floor"),
                ("is_on_campus", "gender_restriction"),
                "description",
            )
        }),
        ("房源详情", {
            "fields": (
                "room_type",
                ("bathroom_type", "bathroom_note"),
                ("has_kitchen", "kitchen_note"),
                "area",
                ("price_min", "price_max"),
            )
        }),
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
        ("费用说明", {
            "fields": (
                ("electricity_fee", "water_fee"),
                ("internet_fee", "gas_fee"),
                ("property_fee", "misc_fee"),
            ),
            "classes": ("collapse",),
        }),
    )

    def price_display(self, obj):
        return obj.price_display

    price_display.short_description = "价格"


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "price_range", "move_in_date", "is_processed", "created_at")
    list_filter = ("is_processed", "created_at")
    search_fields = ("name", "phone", "requirements")
    list_editable = ("is_processed",)
    readonly_fields = ("created_at",)
    ordering = ("-created_at",)

    fieldsets = (
        ("客户信息", {"fields": ("name", "phone")}),
        ("需求信息", {"fields": ("requirements", "move_in_date", ("price_min", "price_max"))}),
        ("处理状态", {"fields": ("is_processed", "created_at")}),
    )

    def price_range(self, obj):
        if obj.price_min and obj.price_max:
            return f"¥{obj.price_min}-{obj.price_max}"
        elif obj.price_min:
            return f"¥{obj.price_min}起"
        elif obj.price_max:
            return f"¥{obj.price_max}以内"
        return "-"

    price_range.short_description = "价格区间"
