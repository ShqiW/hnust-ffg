from django.db import models
from django.utils import timezone


class Property(models.Model):
    # 房型选项
    ROOM_TYPE_CHOICES = [
        ("single_shared", "单间公共卫生间"),
        ("single_private", "单间独立卫生间"),
        ("one_bedroom", "一室一厅一卫"),
        ("two_bedroom", "两室一厅一卫"),
    ]

    # 出租状态选项
    RENTAL_STATUS_CHOICES = [
        ("available", "可出租"),
        ("rented", "已出租"),
        ("reserved", "已预订"),
    ]

    title = models.CharField(max_length=200, verbose_name="标题")
    location = models.CharField(max_length=200, verbose_name="位置")
    is_on_campus = models.BooleanField(default=False, verbose_name="是否在校园内")

    # 价格区间
    price_min = models.DecimalField(
        max_digits=10, decimal_places=0, verbose_name="最低价格(元/月)"
    )
    price_max = models.DecimalField(
        max_digits=10, decimal_places=0, verbose_name="最高价格(元/月)"
    )

    # 房型下拉列表
    room_type = models.CharField(
        max_length=50, choices=ROOM_TYPE_CHOICES, verbose_name="房型"
    )
    area = models.CharField(max_length=50, verbose_name="面积")
    floor = models.PositiveIntegerField(null=True, blank=True, verbose_name="楼层")

    # 出租状态
    rental_status = models.CharField(
        max_length=20,
        choices=RENTAL_STATUS_CHOICES,
        default="available",
        verbose_name="出租状态",
    )

    # 最早可入住日期（只有非已出租状态才有意义）
    available_from = models.DateField(
        null=True, blank=True, verbose_name="最早可入住日期"
    )

    description = models.TextField(blank=True, verbose_name="描述")

    # 设施（复选框）
    has_air_conditioning = models.BooleanField(default=False, verbose_name="空调")
    has_water_heater = models.BooleanField(default=False, verbose_name="热水器")
    has_washing_machine = models.BooleanField(default=False, verbose_name="洗衣机")
    has_refrigerator = models.BooleanField(default=False, verbose_name="冰箱")
    has_tv = models.BooleanField(default=False, verbose_name="电视")
    has_wifi = models.BooleanField(default=False, verbose_name="WiFi")
    has_bed = models.BooleanField(default=False, verbose_name="床")
    has_desk = models.BooleanField(default=False, verbose_name="书桌")
    has_wardrobe = models.BooleanField(default=False, verbose_name="衣柜")

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")

    class Meta:
        verbose_name = "房源"
        verbose_name_plural = "房源"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # 已出租：保留后台设置的时间（租约到期日）
        # 已预定/可出租：显示当前时间
        if self.rental_status in ("available", "reserved"):
            self.available_from = timezone.now().date()
        super().save(*args, **kwargs)

    @property
    def price_display(self):
        if self.price_min == self.price_max:
            return f"¥{self.price_min}/月"
        return f"¥{self.price_min}-{self.price_max}/月"


class PropertyImage(models.Model):
    property = models.ForeignKey(
        Property, related_name="images", on_delete=models.CASCADE, verbose_name="房源"
    )
    image = models.ImageField(upload_to="properties/", verbose_name="图片")
    is_main = models.BooleanField(default=False, verbose_name="是否主图")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")

    class Meta:
        verbose_name = "房源图片"
        verbose_name_plural = "房源图片"

    def __str__(self):
        return f"{self.property.title} - 图片"
