from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Property, PropertyImage, PropertyFacility, Contact
from .serializers import (
    PropertySerializer,
    PropertyImageSerializer,
    PropertyFacilitySerializer,
    ContactSerializer,
)

# Create your views here.


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def get_queryset(self):
        queryset = Property.objects.all()

        # 筛选条件
        is_on_campus = self.request.query_params.get("is_on_campus", None)
        min_price = self.request.query_params.get("min_price", None)
        max_price = self.request.query_params.get("max_price", None)
        room_type = self.request.query_params.get("room_type", None)
        available_from = self.request.query_params.get("available_from", None)
        search = self.request.query_params.get("search", None)

        if is_on_campus is not None:
            queryset = queryset.filter(is_on_campus=is_on_campus)

        if min_price is not None:
            queryset = queryset.filter(price__gte=min_price)

        if max_price is not None:
            queryset = queryset.filter(price__lte=max_price)

        if room_type is not None:
            queryset = queryset.filter(room_type=room_type)

        if available_from is not None:
            queryset = queryset.filter(available_from__gte=available_from)

        if search is not None:
            queryset = queryset.filter(
                Q(title__icontains=search)
                | Q(location__icontains=search)
                | Q(description__icontains=search)
            )

        return queryset

    @action(detail=True, methods=["get"])
    def images(self, request, pk=None):
        property = self.get_object()
        images = PropertyImage.objects.filter(property=property)
        serializer = PropertyImageSerializer(images, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def facilities(self, request, pk=None):
        property = self.get_object()
        facilities = PropertyFacility.objects.filter(property=property)
        serializer = PropertyFacilitySerializer(facilities, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def contacts(self, request, pk=None):
        property = self.get_object()
        contacts = Contact.objects.filter(property=property)
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data)
