# Generated by Django 5.0.6 on 2024-05-17 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camsafedata', '0007_remove_user_username_alter_user_district_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='contact_no',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='name',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
