# Generated by Django 5.0.6 on 2024-05-24 12:26

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camsafedata', '0011_alter_subjectdetails_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subjectdetails',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
