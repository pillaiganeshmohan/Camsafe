# Generated by Django 5.0.4 on 2024-04-06 08:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camsafedata', '0003_alter_user_user_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='login_status',
            field=models.BooleanField(default=False),
        ),
    ]