# Generated by Django 3.2.16 on 2023-12-12 04:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0009_auto_20231210_1106'),
    ]

    operations = [
        migrations.RenameField(
            model_name='avto',
            old_name='vehicle_certificate',
            new_name='vehicle_certificate',
        ),
    ]
