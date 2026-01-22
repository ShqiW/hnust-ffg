from django.db import models
from django.utils import timezone


class Property(models.Model):
    # 位置分区选项
    ZONE_CHOICES = [
        ("A", "芳菲阁A区"),
        ("B", "芳菲阁B区"),
        ("C", "芳菲阁C区"),
        ("D", "芳菲阁D区"),
        ("E", "芳菲阁E区"),
        ("F", "芳菲阁F区"),
        ("G", "芳菲阁G区"),
        ("H", "芳菲阁H区"),
    ]

    # 房型选项
    ROOM_TYPE_CHOICES = [
        ("studio", "单身公寓"),
        ("single", "单间"),
        ("one_bedroom", "一室一厅"),
        ("two_bedroom", "两室一厅"),
        ("three_bedroom", "三室一厅"),
        ("five_bedroom", "五室一厅"),
    ]

    # 出租状态选项
    RENTAL_STATUS_CHOICES = [
        ("available", "可出租"),
        ("rented", "已出租"),
        ("reserved", "已预订"),
    ]

    # 性别限制选项
    GENDER_RESTRICTION_CHOICES = [
        ("any", "不限性别"),
        ("male", "仅限男生"),
        ("female", "仅限女生"),
    ]

    # 卫生间类型选项
    BATHROOM_TYPE_CHOICES = [
        ("private", "独立卫生间"),
        ("shared", "公共卫生间"),
        ("none", "无"),
    ]

    title = models.CharField(max_length=200, verbose_name="标题")
    zone = models.CharField(
        max_length=10, choices=ZONE_CHOICES, blank=True, verbose_name="位置分区"
    )
    location = models.CharField(max_length=200, verbose_name="具体位置")
    room_number = models.CharField(max_length=100, blank=True, verbose_name="房间号")
    is_on_campus = models.BooleanField(default=False, verbose_name="是否在校园内")
    floor = models.PositiveIntegerField(null=True, blank=True, verbose_name="楼层")

    # 性别限制
    gender_restriction = models.CharField(
        max_length=20,
        choices=GENDER_RESTRICTION_CHOICES,
        default="any",
        verbose_name="性别限制",
    )

    # 房型下拉列表
    room_type = models.CharField(
        max_length=50, choices=ROOM_TYPE_CHOICES, verbose_name="房型"
    )

    # 卫生间类型
    bathroom_type = models.CharField(
        max_length=20,
        choices=BATHROOM_TYPE_CHOICES,
        default="private",
        verbose_name="卫生间类型",
    )
    bathroom_note = models.CharField(
        max_length=200, blank=True, verbose_name="卫生间备注"
    )

    # 设施（复选框）
    has_kitchen = models.BooleanField(default=False, verbose_name="厨房")
    kitchen_note = models.CharField(max_length=200, blank=True, verbose_name="厨房备注")
    has_air_conditioning = models.BooleanField(default=False, verbose_name="空调")
    has_water_heater = models.BooleanField(default=False, verbose_name="热水器")
    has_washing_machine = models.BooleanField(default=False, verbose_name="洗衣机")
    has_wifi = models.BooleanField(default=False, verbose_name="网络")
    has_refrigerator = models.BooleanField(default=False, verbose_name="冰箱")
    has_tv = models.BooleanField(default=False, verbose_name="电视")
    has_bed = models.BooleanField(default=False, verbose_name="床")
    has_desk = models.BooleanField(default=False, verbose_name="书桌")
    has_wardrobe = models.BooleanField(default=False, verbose_name="衣柜")

    # 价格区间
    price_min = models.DecimalField(
        max_digits=10, decimal_places=0, null=True, blank=True, verbose_name="最低价格(元/月)"
    )
    price_max = models.DecimalField(
        max_digits=10, decimal_places=0, null=True, blank=True, verbose_name="最高价格(元/月)"
    )

    # 费用说明
    electricity_fee = models.CharField(max_length=200, blank=True, verbose_name="电费")
    water_fee = models.CharField(max_length=200, blank=True, verbose_name="水费")
    internet_fee = models.CharField(max_length=200, blank=True, verbose_name="网络费")
    gas_fee = models.CharField(max_length=200, blank=True, verbose_name="天然气费")
    property_fee = models.CharField(max_length=200, blank=True, verbose_name="物业费")
    misc_fee = models.CharField(max_length=200, blank=True, verbose_name="杂费")

    # 出租状态
    rental_status = models.CharField(
        max_length=20,
        choices=RENTAL_STATUS_CHOICES,
        default="available",
        verbose_name="出租状态",
    )

    # 最早可入住日期
    available_from = models.DateField(
        null=True, blank=True, verbose_name="最早可入住日期"
    )

    description = models.TextField(blank=True, verbose_name="描述")
    area = models.CharField(max_length=50, blank=True, verbose_name="面积")

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


class Inquiry(models.Model):
    """客户咨询表单"""
    name = models.CharField(max_length=50, verbose_name="姓名")
    phone = models.CharField(max_length=20, verbose_name="联系方式")
    requirements = models.TextField(blank=True, verbose_name="房子要求")
    move_in_date = models.DateField(null=True, blank=True, verbose_name="期望入住时间")
    price_min = models.IntegerField(null=True, blank=True, verbose_name="价格下限")
    price_max = models.IntegerField(null=True, blank=True, verbose_name="价格上限")
    is_processed = models.BooleanField(default=False, verbose_name="是否已处理")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="提交时间")

    class Meta:
        verbose_name = "客户咨询"
        verbose_name_plural = "客户咨询"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.phone}"


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
