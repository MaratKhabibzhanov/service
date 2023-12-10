# Generated by Django 3.2.16 on 2023-12-09 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0007_maintenance_total_cost'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='part',
            name='compatible_car',
        ),
        migrations.AlterField(
            model_name='maintenance',
            name='total_cost',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Предварительная стоимость'),
        ),
    ]