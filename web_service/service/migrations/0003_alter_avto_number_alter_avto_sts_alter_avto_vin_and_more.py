# Generated by Django 4.2.1 on 2023-05-16 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0002_alter_workingprice_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='avto',
            name='number',
            field=models.CharField(blank=True, max_length=9, unique=True, verbose_name='Госномер'),
        ),
        migrations.AlterField(
            model_name='avto',
            name='sts',
            field=models.CharField(blank=True, max_length=10, unique=True, verbose_name='Номер свидетельства о регистрации'),
        ),
        migrations.AlterField(
            model_name='avto',
            name='vin',
            field=models.CharField(max_length=17, unique=True, verbose_name='VIN'),
        ),
        migrations.AlterField(
            model_name='carmodel',
            name='model',
            field=models.CharField(max_length=50, unique=True, verbose_name='Модель'),
        ),
        migrations.AlterField(
            model_name='maintenance',
            name='operation',
            field=models.CharField(max_length=150, unique=True, verbose_name='Операция'),
        ),
        migrations.AlterField(
            model_name='warehouse',
            name='spare_part',
            field=models.CharField(max_length=150, unique=True, verbose_name='Запчасть'),
        ),
        migrations.AlterField(
            model_name='workingprice',
            name='working_type',
            field=models.CharField(max_length=50, unique=True, verbose_name='Тип нормочаса'),
        ),
    ]
