# Generated by Django 5.1.2 on 2025-03-13 20:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_pagebackground'),
    ]

    operations = [
        migrations.CreateModel(
            name='Mentor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('position', models.CharField(max_length=100)),
                ('image', models.ImageField(upload_to='mentors/')),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('linkedin', models.URLField(blank=True, null=True)),
                ('github', models.URLField(blank=True, null=True)),
                ('mentor_information', models.TextField()),
            ],
        ),
    ]
