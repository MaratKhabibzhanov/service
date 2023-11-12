from django.db import models

from config import settings


class Warehouse(models.Model):
    """Склад"""
    spare_part = models.CharField("Запчасть", max_length=150, unique=True)
    price = models.DecimalField("Цена", max_digits=9, decimal_places=2)

    def __str__(self):
        return self.spare_part


class WorkingPrice(models.Model):
    """Цена определенного вида работы"""
    working_type = models.CharField("Тип нормочаса", max_length=50, unique=True)
    price = models.DecimalField("Стоимость нормочаса", max_digits=4, decimal_places=0)

    def __str__(self):
        return self.working_type


class Acceptor(models.Model):
    """Мастер - приемщик"""
    first_name = models.CharField("Имя", max_length=50)
    second_name = models.CharField("Фамилия", max_length=50)
    patronim = models.CharField("Отчество", max_length=50)

    def __str__(self):
        return f'{self.second_name} {self.first_name}'


class CarModel(models.Model):
    """Модель автомобиля"""
    model = models.CharField("Модель", max_length=50, unique=True)
    image = models.CharField(max_length=100)
    coef = models.DecimalField("Коэффициент", max_digits=3, decimal_places=1)
    warehouses = models.ManyToManyField(Warehouse, blank=True)

    def __str__(self):
        return self.model


class Maintenance(models.Model):
    """Ремонт"""
    operation = models.CharField("Операция", max_length=150, unique=True)
    working_time = models.DecimalField("Количество нормо-часов", max_digits=3, decimal_places=1)
    warehouses = models.ManyToManyField(Warehouse, verbose_name="Запасные части")
    working_price = models.ForeignKey(WorkingPrice, verbose_name="Предварительная стоимость", on_delete=models.PROTECT)

    def __str__(self):
        return self.operation


class Avto(models.Model):
    """Автомобиль"""
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name="Собственник", on_delete=models.CASCADE)
    vin = models.CharField("VIN", max_length=17, unique=True)
    number = models.CharField("Госномер", max_length=9, blank=True, unique=True)
    sts = models.CharField("Номер свидетельства о регистрации", max_length=10, blank=True, unique=True)
    sold_date = models.DateField("Дата продажи", blank=True)
    engine_vol = models.CharField("Объём двигателя", max_length=3)
    mileage = models.IntegerField("Пробег")
    car_model = models.ForeignKey(CarModel, verbose_name="Модель автомобиля", on_delete=models.PROTECT)

    def __str__(self):
        return self.vin


class Registration(models.Model):
    """Регистрация"""
    day = models.DateField("Дата")
    time = models.TimeField("Время")
    acceptor = models.ForeignKey(Acceptor, verbose_name="Мастер приемщик", on_delete=models.PROTECT)
    maintenance = models.ForeignKey(Maintenance, verbose_name="Тип ремонта", on_delete=models.PROTECT)
    avto = models.ForeignKey(Avto, verbose_name="Автомобиль", on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.day} {self.time}'
