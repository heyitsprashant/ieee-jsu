from django.db import models
from django.utils import timezone
from django.utils.text import slugify

class StudentOfficer(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    image = models.ImageField(upload_to='student_officers')
    linkedin = models.URLField(max_length=200, blank=True)
    github = models.URLField(max_length=200, blank=True)
    email = models.EmailField(max_length=200, blank=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0, help_text="Order in which the officer should appear (lower numbers appear first)")

    class Meta:
        ordering = ['order', 'name']
        verbose_name = "Student Officer"
        verbose_name_plural = "Student Officers"

    def __str__(self):
        return self.name

class Mentor(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    image = models.ImageField(upload_to='mentors')
    linkedin = models.URLField(max_length=200, blank=True)
    github = models.URLField(max_length=200, blank=True)
    email = models.EmailField(max_length=200, blank=True)
    google_scholar = models.URLField(max_length=200, blank=True)
    personal_website = models.URLField(max_length=200, blank=True)
    bio = models.TextField(help_text="Detailed information about the mentor's background and expertise")
    expertise = models.CharField(max_length=200, help_text="Main areas of expertise")
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0, help_text="Order in which the mentor should appear (lower numbers appear first)")

    class Meta:
        ordering = ['order', 'name']
        verbose_name = "Mentor"
        verbose_name_plural = "Mentors"

    def __str__(self):
        return self.name

class Event(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    date = models.DateField()
    location = models.CharField(max_length=100)
    description = models.TextField(help_text="Short description for event cards")
    excerpt = models.TextField(blank=True, help_text="Longer excerpt for event detail page")
    content = models.TextField(blank=True, help_text="Full content for the event detail page")
    image = models.ImageField(upload_to='events')
    registration_link = models.URLField(max_length=200, blank=True)
    has_gallery = models.BooleanField(default=False, help_text="Check if event has a media gallery")
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class EventGalleryItem(models.Model):
    MEDIA_TYPES = (
        ('image', 'Image'),
        ('video', 'Video'),
    )
    
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='gallery_items')
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPES, default='image')
    image = models.ImageField(upload_to='event_gallery', blank=True, null=True)
    video_url = models.URLField(blank=True, null=True, help_text="YouTube or Vimeo URL")
    caption = models.CharField(max_length=200, blank=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name = "Event Gallery Item"
        verbose_name_plural = "Event Gallery Items"
    
    def __str__(self):
        return f"{self.event.title} - Gallery Item {self.order}"
    

class Contact(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=100)
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.first_name} - {self.email}'
    

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    author = models.CharField(max_length=100)
    content = models.TextField()
    excerpt = models.TextField(max_length=500, help_text="A short summary of the blog post")
    image = models.ImageField(upload_to='blog_images', blank=True, null=True)
    video_url = models.URLField(max_length=200, blank=True, help_text="YouTube or other video embed URL")
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title
    

class PageBackground(models.Model):
    PAGE_CHOICES = [
        ('home', 'Home Page'),
        ('about', 'About Page'),
        ('blog', 'Blog Page'),
        ('events', 'Events Page'),
        ('members', 'Members Page'),
        ('contact', 'Contact Page'),
    ]
    
    page = models.CharField(max_length=20, choices=PAGE_CHOICES, unique=True)
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=500)
    background_image = models.ImageField(upload_to='backgrounds/')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.get_page_display()} Background"

    class Meta:
        verbose_name = "Page Background"
        verbose_name_plural = "Page Backgrounds"
    

class AboutSection(models.Model):
    title = models.CharField(max_length=200, default="About Us")
    content = models.TextField(help_text="Main content for the about section")
    image = models.ImageField(upload_to='about', blank=True, null=True, help_text="Optional image for the about section")
    button_text = models.CharField(max_length=50, blank=True, null=True, help_text="Optional button text (leave empty for no button)")
    button_url = models.URLField(max_length=200, blank=True, null=True, help_text="URL for the button if button text is provided")
    section_order = models.IntegerField(default=1, help_text="Order in which sections appear (lower numbers appear first)")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "About Section"
        verbose_name_plural = "About Sections"
        ordering = ['section_order']

    def __str__(self):
        return self.title

class HomeInformation(models.Model):
    MEDIA_TYPES = [
        ('image', 'Image'),
        ('video', 'Video'),
        ('video_link', 'Video Link'),
    ]
    
    SECTION_TYPES = [
        ('text_media', 'Text with Media'),
        ('media_only', 'Media Only'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    section_type = models.CharField(max_length=20, choices=SECTION_TYPES, default='text_media')
    media_type = models.CharField(max_length=20, choices=MEDIA_TYPES, default='image')
    image = models.ImageField(upload_to='home_info', blank=True, null=True)
    video = models.FileField(upload_to='home_info/videos', blank=True, null=True)
    video_link = models.URLField(blank=True, null=True, help_text="YouTube or Vimeo URL")
    is_homepage_feature = models.BooleanField(default=False, help_text="Check if this should be featured at the top of the homepage")
    order = models.IntegerField(default=0, help_text="Order in which the section should appear (lower numbers appear first)")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'created_at']
        verbose_name = "Home Information"
        verbose_name_plural = "Home Information"

    def __str__(self):
        return self.title

class MissionSection(models.Model):
    title = models.CharField(max_length=200, default="Our Mission")
    content = models.TextField(help_text="Main content for the mission section")
    image = models.ImageField(upload_to='mission', blank=True, null=True, help_text="Optional image for the mission section")
    button_text = models.CharField(max_length=50, blank=True, null=True, help_text="Optional button text (leave empty for no button)")
    button_url = models.URLField(max_length=200, blank=True, null=True, help_text="URL for the button if button text is provided")
    is_active = models.BooleanField(default=True, help_text="Only one mission section should be active")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Mission Section"
        verbose_name_plural = "Mission Section"

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # Ensure only one mission section is active
        if self.is_active:
            MissionSection.objects.exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)
    
