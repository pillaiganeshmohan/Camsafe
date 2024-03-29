# Generated by Django 5.0.2 on 2024-02-15 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camsafedata', '0003_cctvidentitymaster'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdminIdentity',
            fields=[
                ('AI_police_station_name', models.CharField(max_length=50)),
                ('AI_police_station_code', models.CharField(max_length=10)),
                ('AI_state', models.CharField(max_length=25)),
                ('AI_district', models.CharField(max_length=25)),
                ('AI_taluka', models.CharField(max_length=25)),
                ('AI_pin_code', models.IntegerField()),
                ('AI_location_name', models.CharField(max_length=25)),
                ('AI_thana_incharge', models.CharField(max_length=50)),
                ('AI_admin_id', models.IntegerField(primary_key=True, serialize=False)),
                ('AI_admin_password', models.CharField(max_length=50)),
                ('AI_email', models.CharField(max_length=50)),
                ('AI_name', models.CharField(max_length=50)),
                ('AI_contact_no', models.IntegerField()),
            ],
        ),
    ]
