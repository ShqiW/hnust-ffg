from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from django.conf import settings
from .models import Property, PropertyImage, Inquiry
from .serializers import PropertySerializer, PropertyImageSerializer, InquirySerializer


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    pagination_class = None  # 禁用分页，返回所有数据

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


class InquiryViewSet(viewsets.ModelViewSet):
    """客户咨询接口"""
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    http_method_names = ["post", "get"]  # 只允许创建和查看

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inquiry = serializer.save()

        # 发送短信通知管理员
        self.send_sms_notification(inquiry)

        return Response(
            {"message": "提交成功，我们会尽快联系您！", "data": serializer.data},
            status=status.HTTP_201_CREATED,
        )

    def send_sms_notification(self, inquiry):
        """发送短信通知管理员"""
        # 获取管理员手机号
        admin_phone = getattr(settings, "ADMIN_PHONE", None)
        if not admin_phone:
            return

        # 这里可以集成阿里云短信、腾讯云短信等服务
        # 示例：使用阿里云短信
        try:
            from alibabacloud_dysmsapi20170525.client import Client
            from alibabacloud_dysmsapi20170525 import models as sms_models
            from alibabacloud_tea_openapi import models as open_api_models

            access_key_id = getattr(settings, "ALIYUN_ACCESS_KEY_ID", None)
            access_key_secret = getattr(settings, "ALIYUN_ACCESS_KEY_SECRET", None)
            sign_name = getattr(settings, "ALIYUN_SMS_SIGN_NAME", None)
            template_code = getattr(settings, "ALIYUN_SMS_TEMPLATE_CODE", None)

            if not all([access_key_id, access_key_secret, sign_name, template_code]):
                print("短信配置不完整，跳过发送")
                return

            config = open_api_models.Config(
                access_key_id=access_key_id,
                access_key_secret=access_key_secret,
            )
            config.endpoint = "dysmsapi.aliyuncs.com"
            client = Client(config)

            send_sms_request = sms_models.SendSmsRequest(
                phone_numbers=admin_phone,
                sign_name=sign_name,
                template_code=template_code,
                template_param=f'{{"name":"{inquiry.name}","phone":"{inquiry.phone}"}}',
            )
            client.send_sms(send_sms_request)
            print(f"短信发送成功: {admin_phone}")
        except ImportError:
            print("阿里云短信SDK未安装，跳过发送")
        except Exception as e:
            print(f"短信发送失败: {e}")
