# Generated by Django 4.2.13 on 2024-05-28 10:27

import camsafedata.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camsafedata', '0020_alter_subject_master_front_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subject',
            name='master_front_profile',
            field=models.ImageField(blank=True, null=True, upload_to=camsafedata.models.upload_path),
        ),
    ]
