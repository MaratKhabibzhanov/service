# Generated by Django 3.2.16 on 2023-12-16 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0013_auto_20231216_1418'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carmodel',
            name='compatible_engines',
            field=models.ManyToManyField(related_name='carmodels', to='service.Engine', verbose_name='Совместимые двигатели'),
        ),
    ]
