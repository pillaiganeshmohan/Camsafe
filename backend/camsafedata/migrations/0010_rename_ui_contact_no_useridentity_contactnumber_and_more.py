# Generated by Django 5.0.2 on 2024-02-28 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camsafedata', '0009_rename_cu_email_contactus_email_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='useridentity',
            old_name='UI_contact_no',
            new_name='contactNumber',
        ),
        migrations.RenameField(
            model_name='useridentity',
            old_name='UI_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='useridentity',
            old_name='UI_user_password',
            new_name='password',
        ),
        migrations.RenameField(
            model_name='useridentity',
            old_name='UI_police_center_code',
            new_name='policeCenterCode',
        ),
        migrations.RemoveField(
            model_name='useridentity',
            name='UI_user_email_id',
        ),
        migrations.RemoveField(
            model_name='useridentity',
            name='UI_user_id',
        ),
        migrations.AddField(
            model_name='useridentity',
            name='userid',
            field=models.AutoField(default=0, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]
