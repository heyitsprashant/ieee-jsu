from django.contrib import admin
from .models import StudentOfficer, Event, Contact, BlogPost, PageBackground, Mentor, EventGalleryItem, HomeInformation, AboutSection

admin.site.site_header = 'IEEE JSU Admin'
admin.site.site_title = 'IEEE JSU Admin'
admin.site.index_title = 'IEEE JSU Admin'

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at', 'is_published')
    list_filter = ('is_published', 'created_at', 'author')
    search_fields = ('title', 'content', 'author')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'created_at'
    list_editable = ('is_published',)
    fieldsets = (
        ('Post Information', {
            'fields': ('title', 'slug', 'author', 'excerpt', 'content')
        }),
        ('Media', {
            'fields': ('image', 'video_url'),
            'classes': ('collapse',)
        }),
        ('Publication', {
            'fields': ('is_published', 'created_at'),
        }),
    )

@admin.register(PageBackground)
class PageBackgroundAdmin(admin.ModelAdmin):
    list_display = ('page', 'title', 'is_active', 'updated_at')
    list_filter = ('page', 'is_active')
    search_fields = ('title', 'subtitle')
    ordering = ('page',)

@admin.register(StudentOfficer)
class StudentOfficerAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'is_active', 'order')
    list_filter = ('is_active', 'position')
    search_fields = ('name', 'position')
    list_editable = ('is_active', 'order')

@admin.register(Mentor)
class MentorAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'expertise', 'is_active', 'order')
    list_filter = ('is_active', 'expertise')
    search_fields = ('name', 'position', 'bio', 'expertise')
    list_editable = ('is_active', 'order')
    

class EventGalleryItemInline(admin.TabularInline):
    model = EventGalleryItem
    extra = 1
    fields = ('media_type', 'image', 'video_url', 'caption', 'order')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'location', 'has_gallery')
    list_filter = ('date', 'has_gallery')
    search_fields = ('title', 'description', 'content')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'date'
    fieldsets = (
        ('Event Information', {
            'fields': ('title', 'slug', 'date', 'location', 'description', 'excerpt', 'content')
        }),
        ('Media', {
            'fields': ('image', 'registration_link', 'has_gallery'),
        }),
    )
    inlines = [EventGalleryItemInline]

@admin.register(HomeInformation)
class HomeInformationAdmin(admin.ModelAdmin):
    list_display = ('title', 'section_type', 'media_type', 'is_homepage_feature', 'is_active', 'order', 'created_at')
    list_filter = ('section_type', 'media_type', 'is_homepage_feature', 'is_active')
    search_fields = ('title', 'description')
    list_editable = ('is_active', 'order')
    fieldsets = (
        ('Content Type', {
            'fields': ('section_type',)
        }),
        ('Content', {
            'fields': ('title', 'description'),
            'classes': ('content-section',)
        }),
        ('Media', {
            'fields': ('media_type', 'image', 'video', 'video_link'),
            'classes': ('collapse',)
        }),
        ('Display Settings', {
            'fields': ('is_homepage_feature', 'is_active', 'order')
        }),
    )

    class Media:
        js = ('admin/js/jquery.init.js', 'admin/js/select2.min.js',)

    def get_fieldsets(self, request, obj=None):
        fieldsets = super().get_fieldsets(request, obj)
        if obj and obj.section_type == 'media_only':
            fieldsets = [fs for fs in fieldsets if fs[0] != 'Content']
        return fieldsets

@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'section_order', 'is_active', 'updated_at')
    list_filter = ('is_active',)
    list_editable = ('section_order', 'is_active')
    search_fields = ('title', 'content')
    fieldsets = (
        ('Content', {
            'fields': ('title', 'content')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Button (Optional)', {
            'fields': ('button_text', 'button_url'),
            'classes': ('collapse',)
        }),
        ('Settings', {
            'fields': ('section_order', 'is_active',)
        }),
    )

# Simplified registration for other models
admin.site.register(Contact)