from django.db import models

# Create your models here.


class Property(models.Model):
    title = models.CharField(max_length=200, verbose_name="标题")
    location = models.CharField(max_length=200, verbose_name="位置")
    is_on_campus = models.BooleanField(default=False, verbose_name="是否在校园内")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="价格")
    price_unit = models.CharField(max_length=20, default="月", verbose_name="价格单位")
    available_from = models.DateField(verbose_name="可入住日期")
    room_type = models.CharField(max_length=50, verbose_name="房型")
    area = models.CharField(max_length=50, verbose_name="面积")
    description = models.TextField(verbose_name="描述")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")

    class Meta:
        verbose_name = "房源"
        verbose_name_plural = "房源"

    def __str__(self):
        return self.title


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


class PropertyFacility(models.Model):
    property = models.ForeignKey(
        Property,
        related_name="facilities",
        on_delete=models.CASCADE,
        verbose_name="房源",
    )
    name = models.CharField(max_length=100, verbose_name="设施名称")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")

    class Meta:
        verbose_name = "房源设施"
        verbose_name_plural = "房源设施"

    def __str__(self):
        return f"{self.property.title} - {self.name}"


class Contact(models.Model):
    property = models.ForeignKey(
        Property, related_name="contacts", on_delete=models.CASCADE, verbose_name="房源"
    )
    name = models.CharField(max_length=100, verbose_name="联系人姓名")
    phone = models.CharField(max_length=20, verbose_name="电话")
    email = models.EmailField(verbose_name="邮箱")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")

    class Meta:
        verbose_name = "联系人"
        verbose_name_plural = "联系人"

    def __str__(self):
        return f"{self.property.title} - {self.name}"
