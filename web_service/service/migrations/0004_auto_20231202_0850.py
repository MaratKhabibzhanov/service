# Generated by Django 3.2.16 on 2023-12-02 08:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0003_auto_20231126_1018'),
    ]

    operations = [
        migrations.CreateModel(
            name='Part',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('spare_part', models.CharField(max_length=150, unique=True, verbose_name='Запчасть')),
                ('price', models.DecimalField(decimal_places=2, max_digits=9, verbose_name='Цена')),
            ],
        ),
        migrations.RenameModel(
            old_name='WorkingPrice',
            new_name='WorkingType',
        ),
        migrations.RemoveField(
            model_name='carmodel',
            name='coef',
        ),
        migrations.RemoveField(
            model_name='carmodel',
            name='warehouses',
        ),
        migrations.RemoveField(
            model_name='maintenance',
            name='warehouses',
        ),
        migrations.RemoveField(
            model_name='maintenance',
            name='working_price',
        ),
        migrations.AddField(
            model_name='maintenance',
            name='car_model',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='service.carmodel', verbose_name='Модель автомобиля'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='maintenance',
            name='working_type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='service.workingtype', verbose_name='Тип нормо-часа'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='avto',
            name='mileage',
            field=models.IntegerField(blank=True, verbose_name='Пробег'),
        ),
        migrations.DeleteModel(
            name='Warehouse',
        ),
        migrations.AddField(
            model_name='part',
            name='compatible_car',
            field=models.ManyToManyField(related_name='parts', to='service.CarModel', verbose_name='Совместимый автомобиль'),
        ),
        migrations.AddField(
            model_name='maintenance',
            name='parts',
            field=models.ManyToManyField(related_name='maintenances', to='service.Part', verbose_name='Запасные части'),
        ),
    ]
