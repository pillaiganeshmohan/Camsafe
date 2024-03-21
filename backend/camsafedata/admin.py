from django.contrib import admin
from .models import Subject, CCTVIdentityMaster, AdminIdentity, UserIdentity, CcTVIdentityTransaction, FeatureData, ContactUs

admin.site.register(Subject)
admin.site.register(CCTVIdentityMaster)
admin.site.register(AdminIdentity)
admin.site.register(UserIdentity)
admin.site.register(CcTVIdentityTransaction)
admin.site.register(FeatureData)
admin.site.register(ContactUs)