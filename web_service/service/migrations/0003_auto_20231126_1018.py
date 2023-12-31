# Generated by Django 3.2.16 on 2023-11-26 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0002_auto_20231125_0853'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carmodel',
            name='image',
            field=models.ImageField(upload_to='image'),
        ),
        migrations.AlterField(
            model_name='carmodel',
            name='warehouses',
            field=models.ManyToManyField(blank=True, related_name='carmodels', to='service.Warehouse'),
        ),
        migrations.AlterField(
            model_name='maintenance',
            name='warehouses',
            field=models.ManyToManyField(related_name='maintenances', to='service.Warehouse', verbose_name='Запасные части'),
        ),
    ]
