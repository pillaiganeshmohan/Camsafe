from django.contrib import admin
from .models import Subject, CCTVIdentityMaster, AdminIdentity, UserIdentity, CcTVIdentityTransaction, FeatureData, ContactUs
from .models import User, UserProfile, SubjectDetails,ProImage, Notification

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'user_role', 'police_station_code', 'is_active')
    search_fields = ('email', 'user_role', 'police_station_code')
    list_filter = ('is_active', 'user_role')



admin.site.register(CcTVIdentityTransaction)
admin.site.register(ContactUs)
admin.site.register(SubjectDetails)
admin.site.register(ProImage)
admin.site.register(Notification)