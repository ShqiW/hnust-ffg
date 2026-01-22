import csv
from datetime import datetime
from decimal import Decimal, InvalidOperation

from django.core.management.base import BaseCommand
from django.utils import timezone

from properties.models import Property


class Command(BaseCommand):
    help = "从 CSV 文件导入房源数据"

    def add_arguments(self, parser):
        parser.add_argument(
            "csv_file",
            type=str,
            help="CSV 文件路径",
        )
        parser.add_argument(
            "--clear",
            action="store_true",
            help="导入前清空现有数据",
        )

    def handle(self, *args, **options):
        csv_file = options["csv_file"]

        if options["clear"]:
            count = Property.objects.count()
            Property.objects.all().delete()
            self.stdout.write(self.style.WARNING(f"已清空 {count} 条现有数据"))

        with open(csv_file, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            properties_to_create = []
            error_count = 0

            for row in reader:
                try:
                    property_obj = self.build_property(row)
                    if property_obj:
                        properties_to_create.append(property_obj)
                        self.stdout.write(f"准备导入: {property_obj.title}")
                except Exception as e:
                    error_count += 1
                    self.stdout.write(
                        self.style.ERROR(f"解析失败 (行 {row.get('序号', '?')}): {e}")
                    )

            # 使用 bulk_create 绕过 save 方法，保留原始 available_from
            if properties_to_create:
                Property.objects.bulk_create(properties_to_create)

        self.stdout.write(
            self.style.SUCCESS(
                f"\n导入完成: 成功 {len(properties_to_create)} 条, 失败 {error_count} 条"
            )
        )

    def build_property(self, row):
        """构建 Property 对象但不保存"""
        # 提取位置分区 (芳菲阁A区 -> A)
        zone_raw = row.get("位置分区", "").strip()
        zone = self.parse_zone(zone_raw)

        # 房间号
        room_number = row.get("房间号", "").strip()

        # 生成标题
        title = f"{zone_raw} {room_number}".strip()
        if not title:
            title = f"房源 {row.get('序号', '')}"

        # 具体位置
        location = row.get("具体位置", "").strip()

        # 校园内外
        is_on_campus = row.get("校园内外", "").strip() == "校园内"

        # 楼层
        floor = self.parse_int(row.get("楼层", ""))

        # 性别限制
        gender_restriction = self.parse_gender(row.get("租户性别", ""))

        # 房型
        room_type = self.parse_room_type(row.get("房型", ""))

        # 卫生间
        bathroom_raw = row.get("独立卫生间", "").strip()
        bathroom_type, bathroom_note = self.parse_bathroom(bathroom_raw)

        # 厨房
        kitchen_raw = row.get("厨房", "").strip()
        has_kitchen = "有" in kitchen_raw if kitchen_raw else False
        kitchen_note = kitchen_raw if "（" in kitchen_raw else ""

        # 设施
        has_air_conditioning = row.get("空调", "").strip() == "有"
        has_water_heater = row.get("热水器", "").strip() == "有"
        has_washing_machine = row.get("洗衣机", "").strip() == "有"
        has_wifi = row.get("网络", "").strip() == "有"

        # 价格
        price_min = self.parse_decimal(row.get("最低标准（元/月）", ""))
        price_max = self.parse_decimal(row.get("最高标准", ""))

        # 费用
        electricity_fee = row.get("电费", "").strip()
        water_fee = row.get("水费", "").strip()
        internet_fee = row.get("网络费", "").strip()
        gas_fee = row.get("天然气费", "").strip()
        property_fee = row.get("物业费", "").strip()
        misc_fee = row.get("杂费共计", "").strip()

        # 最早可入住日期
        available_from = self.parse_date(row.get("最早可入住", ""))

        # 根据日期判断出租状态
        rental_status = "available"
        if available_from and available_from > timezone.now().date():
            rental_status = "rented"

        # 返回 Property 对象，不调用 save
        return Property(
            title=title,
            zone=zone,
            location=location,
            room_number=room_number,
            is_on_campus=is_on_campus,
            floor=floor,
            gender_restriction=gender_restriction,
            room_type=room_type,
            bathroom_type=bathroom_type,
            bathroom_note=bathroom_note,
            has_kitchen=has_kitchen,
            kitchen_note=kitchen_note,
            has_air_conditioning=has_air_conditioning,
            has_water_heater=has_water_heater,
            has_washing_machine=has_washing_machine,
            has_wifi=has_wifi,
            price_min=price_min,
            price_max=price_max,
            electricity_fee=electricity_fee,
            water_fee=water_fee,
            internet_fee=internet_fee,
            gas_fee=gas_fee,
            property_fee=property_fee,
            misc_fee=misc_fee,
            rental_status=rental_status,
            available_from=available_from,
        )

    def parse_zone(self, zone_raw):
        """解析位置分区: 芳菲阁A区 -> A"""
        zone_map = {
            "芳菲阁A区": "A",
            "芳菲阁B区": "B",
            "芳菲阁C区": "C",
            "芳菲阁D区": "D",
            "芳菲阁E区": "E",
            "芳菲阁F区": "F",
            "芳菲阁G区": "G",
            "芳菲阁H区": "H",
        }
        # 去除空格后匹配
        zone_raw_clean = zone_raw.replace(" ", "")
        return zone_map.get(zone_raw_clean, "")

    def parse_gender(self, gender_raw):
        """解析性别限制"""
        gender_raw = gender_raw.strip()
        if "男" in gender_raw:
            return "male"
        elif "女" in gender_raw:
            return "female"
        return "any"

    def parse_room_type(self, room_type_raw):
        """解析房型"""
        room_type_raw = room_type_raw.strip()
        room_type_map = {
            "单身公寓": "studio",
            "单间": "single",
            "一室一厅": "one_bedroom",
            "两室一厅": "two_bedroom",
            "三室一厅": "three_bedroom",
            "五室一厅": "five_bedroom",
        }
        return room_type_map.get(room_type_raw, "single")

    def parse_bathroom(self, bathroom_raw):
        """解析卫生间类型，返回 (type, note)"""
        if not bathroom_raw or bathroom_raw == "-":
            return "none", ""
        if "公共" in bathroom_raw:
            # 提取括号内的备注
            note = ""
            if "（" in bathroom_raw:
                note = bathroom_raw
            return "shared", note
        if "有" in bathroom_raw:
            return "private", ""
        return "none", bathroom_raw

    def parse_int(self, value):
        """解析整数，失败返回 None"""
        if not value:
            return None
        try:
            return int(value)
        except (ValueError, TypeError):
            return None

    def parse_decimal(self, value):
        """解析价格，失败返回 None"""
        if not value:
            return None
        try:
            return Decimal(str(value).strip())
        except (InvalidOperation, ValueError):
            return None

    def parse_date(self, date_raw):
        """解析日期，'即日' 返回今天"""
        date_raw = date_raw.strip()
        if not date_raw:
            return None
        if date_raw == "即日":
            return timezone.now().date()

        # 尝试解析日期格式 YYYY-M-D
        for fmt in ["%Y-%m-%d", "%Y-%m-%d", "%Y/%m/%d"]:
            try:
                return datetime.strptime(date_raw, fmt).date()
            except ValueError:
                continue

        # 尝试更宽松的解析
        try:
            parts = date_raw.replace("/", "-").split("-")
            if len(parts) == 3:
                year, month, day = int(parts[0]), int(parts[1]), int(parts[2])
                return datetime(year, month, day).date()
        except (ValueError, IndexError):
            pass

        return None
