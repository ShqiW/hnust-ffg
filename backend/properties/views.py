from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Property, PropertyImage
from .serializers import PropertySerializer, PropertyImageSerializer


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
        rental_status = self.request.query_params.get("rental_status", None)
        available_from = self.request.query_params.get("available_from", None)
        search = self.request.query_params.get("search", None)

        if is_on_campus is not None:
            queryset = queryset.filter(is_on_campus=is_on_campus.lower() == "true")

        if min_price is not None:
            queryset = queryset.filter(price_min__gte=min_price)

        if max_price is not None:
            queryset = queryset.filter(price_max__lte=max_price)

        if room_type is not None:
            queryset = queryset.filter(room_type=room_type)

        if rental_status is not None:
            queryset = queryset.filter(rental_status=rental_status)

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
        property_obj = self.get_object()
        images = PropertyImage.objects.filter(property=property_obj)
        serializer = PropertyImageSerializer(images, many=True)
        return Response(serializer.data)
