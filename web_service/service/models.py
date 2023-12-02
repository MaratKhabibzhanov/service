from django.db import models

from config import settings


class Oil(models.Model):
    """Склад"""
    title = models.CharField("Масло", max_length=50)
    viscosity = models.CharField("Вязкость", max_length=7)
    price = models.DecimalField("Цена", max_digits=9, decimal_places=2)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['title', 'viscosity'],
                name='oil_uq'
            )
        ]

    def __str__(self):
        return f'{self.title} {self.viscosity}'


class WorkingType(models.Model):
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


class Engine(models.Model):
    """Модель автомобиля"""
    model = models.CharField("Модель", max_length=50, unique=True)
    oil = models.ForeignKey(Oil, blank=True, verbose_name="Масло",
                            related_name="engines", on_delete=models.PROTECT)
    oil_count = models.DecimalField("Количество масла", max_digits=3, decimal_places=1)
    engine_vol = models.DecimalField("Объём двигателя", max_digits=3, decimal_places=1)

    def __str__(self):
        return self.model


class CarModel(models.Model):
    """Модель автомобиля"""
    model = models.CharField("Модель", max_length=50, unique=True)
    image = models.ImageField(upload_to='image')
    engine = models.ForeignKey(Engine, verbose_name="Двигатель",
                               related_name="carmodels", on_delete=models.PROTECT)

    def __str__(self):
        return self.model


class Part(models.Model):
    """Склад"""
    spare_part = models.CharField("Запчасть", max_length=150, unique=True)
    price = models.DecimalField("Цена", max_digits=9, decimal_places=2)
    compatible_car = models.ManyToManyField(CarModel, verbose_name="Совместимый автомобиль",
                                            related_name="parts")

    def __str__(self):
        return self.spare_part


class Maintenance(models.Model):
    """Ремонт"""
    operation = models.CharField("Операция", max_length=150, unique=True)
    working_time = models.DecimalField("Количество нормо-часов",
                                       max_digits=3, decimal_places=1)
    parts = models.ManyToManyField(Part, verbose_name="Запасные части",
                                   related_name='maintenances')
    working_type = models.ForeignKey(WorkingType, verbose_name="Тип нормо-часа",
                                     related_name="maintenances", on_delete=models.PROTECT)
    car_model = models.ForeignKey(CarModel, verbose_name="Модель автомобиля",
                                  related_name="maintenances", on_delete=models.PROTECT)

    def __str__(self):
        return self.operation


class Avto(models.Model):
    """Автомобиль"""
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name="Собственник",
                              on_delete=models.CASCADE, related_name="avtos")
    vin = models.CharField("VIN", max_length=17, unique=True)
    number = models.CharField("Госномер", max_length=9, blank=True, unique=True)
    sts = models.CharField("Номер свидетельства о регистрации", max_length=10, blank=True, unique=True)
    sold_date = models.DateField("Дата продажи", blank=True)
    mileage = models.IntegerField("Пробег", blank=True)
    car_model = models.ForeignKey(CarModel, verbose_name="Модель автомобиля",
                                  related_name="avtos", on_delete=models.PROTECT)

    def __str__(self):
        return self.vin


class Registration(models.Model):
    """Регистрация"""
    day = models.DateField("Дата")
    time = models.TimeField("Время")
    acceptor = models.ForeignKey(Acceptor, verbose_name="Мастер приемщик",
                                 related_name="registrations", on_delete=models.PROTECT)
    maintenance = models.ForeignKey(Maintenance, verbose_name="Тип ремонта",
                                    related_name="registrations", on_delete=models.PROTECT)
    avto = models.ForeignKey(Avto, verbose_name="Автомобиль", related_name="registrations",
                             on_delete=models.CASCADE)
    canceled = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.day} {self.time}'
