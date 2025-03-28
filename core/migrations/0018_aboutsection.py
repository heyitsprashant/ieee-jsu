# Generated by Django 5.1.2 on 2025-03-18 10:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0017_missionsection'),
    ]

    operations = [
        migrations.CreateModel(
            name='AboutSection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='About Us', max_length=200)),
                ('content', models.TextField(help_text='Main content for the about section')),
                ('image', models.ImageField(blank=True, help_text='Optional image for the about section', null=True, upload_to='about')),
                ('button_text', models.CharField(blank=True, help_text='Optional button text (leave empty for no button)', max_length=50, null=True)),
                ('button_url', models.URLField(blank=True, help_text='URL for the button if button text is provided', null=True)),
                ('section_order', models.IntegerField(default=1, help_text='Order in which sections appear (lower numbers appear first)')),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'About Section',
                'verbose_name_plural': 'About Sections',
                'ordering': ['section_order'],
            },
        ),
    ]
