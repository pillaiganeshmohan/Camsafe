# Generated by Django 5.0.2 on 2024-02-23 05:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camsafedata', '0007_alter_adminidentity_ai_admin_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContactUs',
            fields=[
                ('CU_fname', models.CharField(max_length=50)),
                ('CU_lname', models.CharField(max_length=50)),
                ('CU_email', models.EmailField(max_length=50, primary_key=True, serialize=False)),
                ('CU_desc', models.CharField(max_length=100)),
            ],
        ),
    ]
