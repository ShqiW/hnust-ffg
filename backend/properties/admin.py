from django.contrib import admin
from .models import Property, PropertyImage, PropertyFacility, Contact


class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1


class PropertyFacilityInline(admin.TabularInline):
    model = PropertyFacility
    extra = 1


class ContactInline(admin.TabularInline):
    model = Contact
    extra = 1


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "location",
        "is_on_campus",
        "price",
        "available_from",
        "room_type",
    )
    list_filter = ("is_on_campus", "room_type", "available_from")
    search_fields = ("title", "location", "description")
    inlines = [PropertyImageInline, PropertyFacilityInline, ContactInline]
