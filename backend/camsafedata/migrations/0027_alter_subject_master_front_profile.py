# Generated by Django 5.0.6 on 2024-06-05 10:47

import camsafedata.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camsafedata', '0026_alter_subject_master_front_profile_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subject',
            name='master_front_profile',
            field=models.ImageField(blank=True, null=True, upload_to=camsafedata.models.upload_path),
        ),
    ]