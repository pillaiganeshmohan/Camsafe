# Generated by Django 5.0.2 on 2024-02-15 11:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camsafedata', '0002_subject_delete_yourmodel'),
    ]

    operations = [
        migrations.CreateModel(
            name='CCTVIdentityMaster',
            fields=[
                ('camera_location_name', models.CharField(max_length=50)),
                ('camera_number', models.IntegerField()),
                ('camera_brand', models.CharField(max_length=20)),
                ('country', models.CharField(max_length=25)),
                ('state', models.CharField(max_length=25)),
                ('district', models.CharField(max_length=25)),
                ('taluka', models.CharField(max_length=25)),
                ('pin_code', models.IntegerField()),
                ('address', models.CharField(max_length=200)),
                ('camera_id', models.CharField(max_length=15, primary_key=True, serialize=False)),
                ('city', models.CharField(max_length=25)),
                ('latitude', models.IntegerField()),
                ('longitude', models.IntegerField()),
            ],
        ),
    ]
