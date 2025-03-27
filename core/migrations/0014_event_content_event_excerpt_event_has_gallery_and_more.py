# Generated by Django 5.1.6 on 2023-06-16 15:13

import django.db.models.deletion
from django.db import migrations, models
from django.utils.text import slugify

def set_event_slugs(apps, schema_editor):
    Event = apps.get_model('core', 'Event')
    for event in Event.objects.all():
        event.slug = slugify(event.title)
        counter = 1
        original_slug = event.slug
        # Check for uniqueness
        while Event.objects.filter(slug=event.slug).exists():
            event.slug = f"{original_slug}-{counter}"
            counter += 1
        event.save()

class Migration(migrations.Migration):

    dependencies = [
        ('core', '0013_delete_aboutsection_mentor_google_scholar_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='content',
            field=models.TextField(blank=True, help_text='Full content for the event detail page'),
        ),
        migrations.AddField(
            model_name='event',
            name='excerpt',
            field=models.TextField(blank=True, help_text='Longer excerpt for event detail page'),
        ),
        migrations.AddField(
            model_name='event',
            name='has_gallery',
            field=models.BooleanField(default=False, help_text='Check if event has a media gallery'),
        ),
        # First add the slug field with null=True to avoid constraint issues
        migrations.AddField(
            model_name='event',
            name='slug',
            field=models.SlugField(blank=True, null=True, unique=True),
        ),
        # Then run the data migration
        migrations.RunPython(set_event_slugs),
        # Now make the field non-nullable
        migrations.AlterField(
            model_name='event',
            name='slug',
            field=models.SlugField(blank=True, unique=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='description',
            field=models.TextField(help_text='Short description for event cards'),
        ),
        migrations.CreateModel(
            name='EventGalleryItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('media_type', models.CharField(choices=[('image', 'Image'), ('video', 'Video')], default='image', max_length=10)),
                ('image', models.ImageField(blank=True, null=True, upload_to='event_gallery')),
                ('video_url', models.URLField(blank=True, help_text='YouTube or Vimeo URL', null=True)),
                ('caption', models.CharField(blank=True, max_length=200)),
                ('order', models.IntegerField(default=0)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='gallery_items', to='core.event')),
            ],
            options={
                'verbose_name': 'Event Gallery Item',
                'verbose_name_plural': 'Event Gallery Items',
                'ordering': ['order'],
            },
        ),
    ]
