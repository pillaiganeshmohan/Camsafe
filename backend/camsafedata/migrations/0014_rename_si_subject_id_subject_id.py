# Generated by Django 5.0.6 on 2024-05-26 01:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('camsafedata', '0013_alter_subjectdetails_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subject',
            old_name='SI_subject_id',
            new_name='id',
        ),
    ]