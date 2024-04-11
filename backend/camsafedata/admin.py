from django.contrib import admin
from .models import Subject, CCTVIdentityMaster, AdminIdentity, UserIdentity, CcTVIdentityTransaction, FeatureData, ContactUs
from .models import User, UserProfile, SubjectDetails,ProImage

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'user_role', 'police_station_code', 'is_active')
    search_fields = ('email', 'user_role', 'police_station_code')
    list_filter = ('is_active', 'user_role')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'is_active', 'created_at', 'updated_at')
    search_fields = ('user__email', 'phone')
    list_filter = ('is_active', 'created_at', 'updated_at')

admin.site.register(Subject)
admin.site.register(CCTVIdentityMaster)
admin.site.register(AdminIdentity)
admin.site.register(UserIdentity)
admin.site.register(CcTVIdentityTransaction)
admin.site.register(FeatureData)
admin.site.register(ContactUs)
admin.site.register(SubjectDetails)
admin.site.register(ProImage)
