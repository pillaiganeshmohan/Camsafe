from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.contrib.auth import get_user_model

def set_default_user(apps, schema_editor):
    SubjectDetails = apps.get_model('camsafedata', 'SubjectDetails')
    User = get_user_model()
    default_user = User.objects.first()  # Ensure you have at least one user in your database or create one.
    if default_user:
        SubjectDetails.objects.filter(user__isnull=True).update(user=default_user)

class Migration(migrations.Migration):

    dependencies = [
        ('camsafedata', '0008_user_contact_no_user_name'),  # Adjust to your previous migration
    ]

    operations = [
        migrations.AddField(
            model_name='subjectdetails',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.RunPython(set_default_user),
        migrations.AlterField(
            model_name='subjectdetails',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
