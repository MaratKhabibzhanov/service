# Generated by Django 3.2.16 on 2023-12-02 09:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0004_auto_20231202_0850'),
    ]

    operations = [
        migrations.AddField(
            model_name='registration',
            name='canceled',
            field=models.BooleanField(default=False),
        ),
    ]