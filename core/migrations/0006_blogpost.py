# Generated by Django 5.1.2 on 2025-03-03 00:27

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_contact'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('slug', models.SlugField(blank=True, unique=True)),
                ('author', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('excerpt', models.TextField(help_text='A short summary of the blog post', max_length=500)),
                ('image', models.ImageField(blank=True, null=True, upload_to='blog_images')),
                ('video_url', models.URLField(blank=True, help_text='YouTube or other video embed URL')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_published', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
