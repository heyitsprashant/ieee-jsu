# Generated by Django 5.1.2 on 2025-03-18 08:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_event_content_event_excerpt_event_has_gallery_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='HomeInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('media_type', models.CharField(choices=[('image', 'Image'), ('video', 'Video'), ('video_link', 'Video Link')], default='image', max_length=20)),
                ('image', models.ImageField(blank=True, null=True, upload_to='home_info')),
                ('video', models.FileField(blank=True, null=True, upload_to='home_info/videos')),
                ('video_link', models.URLField(blank=True, help_text='YouTube or Vimeo URL', null=True)),
                ('is_homepage_feature', models.BooleanField(default=False, help_text='Check if this should be featured at the top of the homepage')),
                ('order', models.IntegerField(default=0, help_text='Order in which the section should appear (lower numbers appear first)')),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Home Information',
                'verbose_name_plural': 'Home Information',
                'ordering': ['order', 'created_at'],
            },
        ),
    ]
