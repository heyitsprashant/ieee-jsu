#!/usr/bin/env python3
"""
Django to MongoDB Migration Script

This script exports data from the Django SQLite database and creates
JSON files that can be imported into MongoDB.

Usage:
    python migrate_data.py
"""

import os
import sys
import django
import json
from datetime import datetime

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ieeejsu.settings')
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
django.setup()

from core.models import (
    StudentOfficer, Mentor, Event, EventGalleryItem, 
    BlogPost, Contact, PageBackground, HomeInformation, 
    AboutSection, MissionSection
)

def serialize_datetime(obj):
    """JSON serializer for datetime objects"""
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")

def export_officers():
    """Export student officers"""
    officers = []
    for officer in StudentOfficer.objects.all():
        officers.append({
            'name': officer.name,
            'position': officer.position,
            'image': str(officer.image) if officer.image else '',
            'linkedin': officer.linkedin,
            'github': officer.github,
            'email': officer.email,
            'is_active': officer.is_active,
            'order': officer.order
        })
    
    with open('migration_data/officers.json', 'w') as f:
        json.dump(officers, f, indent=2)
    print(f"✓ Exported {len(officers)} officers")

def export_mentors():
    """Export mentors"""
    mentors = []
    for mentor in Mentor.objects.all():
        mentors.append({
            'name': mentor.name,
            'position': mentor.position,
            'image': str(mentor.image) if mentor.image else '',
            'linkedin': mentor.linkedin,
            'github': mentor.github,
            'email': mentor.email,
            'google_scholar': mentor.google_scholar,
            'personal_website': mentor.personal_website,
            'bio': mentor.bio,
            'expertise': mentor.expertise,
            'is_active': mentor.is_active,
            'order': mentor.order
        })
    
    with open('migration_data/mentors.json', 'w') as f:
        json.dump(mentors, f, indent=2)
    print(f"✓ Exported {len(mentors)} mentors")

def export_events():
    """Export events with gallery items"""
    events = []
    for event in Event.objects.all():
        gallery_items = []
        if event.has_gallery:
            for item in event.gallery_items.all():
                gallery_items.append({
                    'media_type': item.media_type,
                    'image': str(item.image) if item.image else '',
                    'video_url': item.video_url or '',
                    'caption': item.caption,
                    'order': item.order
                })
        
        events.append({
            'title': event.title,
            'slug': event.slug,
            'date': event.date.isoformat(),
            'location': event.location,
            'description': event.description,
            'excerpt': event.excerpt or '',
            'content': event.content or '',
            'image': str(event.image) if event.image else '',
            'registration_link': event.registration_link or '',
            'has_gallery': event.has_gallery,
            'gallery_items': gallery_items
        })
    
    with open('migration_data/events.json', 'w') as f:
        json.dump(events, f, indent=2, default=serialize_datetime)
    print(f"✓ Exported {len(events)} events")

def export_blog_posts():
    """Export blog posts"""
    posts = []
    for post in BlogPost.objects.all():
        posts.append({
            'title': post.title,
            'slug': post.slug,
            'author': post.author,
            'content': post.content,
            'excerpt': post.excerpt,
            'image': str(post.image) if post.image else '',
            'video_url': post.video_url or '',
            'is_published': post.is_published,
            'createdAt': post.created_at.isoformat(),
            'updatedAt': post.updated_at.isoformat()
        })
    
    with open('migration_data/blog_posts.json', 'w') as f:
        json.dump(posts, f, indent=2)
    print(f"✓ Exported {len(posts)} blog posts")

def export_backgrounds():
    """Export page backgrounds"""
    backgrounds = []
    for bg in PageBackground.objects.all():
        backgrounds.append({
            'page': bg.page,
            'title': bg.title,
            'subtitle': bg.subtitle,
            'background_image': str(bg.background_image) if bg.background_image else '',
            'is_active': bg.is_active
        })
    
    with open('migration_data/backgrounds.json', 'w') as f:
        json.dump(backgrounds, f, indent=2)
    print(f"✓ Exported {len(backgrounds)} backgrounds")

def export_home_info():
    """Export home information sections"""
    sections = []
    for section in HomeInformation.objects.all():
        sections.append({
            'title': section.title,
            'description': section.description or '',
            'section_type': section.section_type,
            'media_type': section.media_type,
            'image': str(section.image) if section.image else '',
            'video': str(section.video) if section.video else '',
            'video_link': section.video_link or '',
            'is_homepage_feature': section.is_homepage_feature,
            'order': section.order,
            'is_active': section.is_active
        })
    
    with open('migration_data/home_info.json', 'w') as f:
        json.dump(sections, f, indent=2)
    print(f"✓ Exported {len(sections)} home sections")

def export_about_sections():
    """Export about sections"""
    sections = []
    for section in AboutSection.objects.all():
        sections.append({
            'title': section.title,
            'content': section.content,
            'image': str(section.image) if section.image else '',
            'button_text': section.button_text or '',
            'button_url': section.button_url or '',
            'section_order': section.section_order,
            'is_active': section.is_active
        })
    
    with open('migration_data/about_sections.json', 'w') as f:
        json.dump(sections, f, indent=2)
    print(f"✓ Exported {len(sections)} about sections")

def main():
    """Main migration function"""
    # Create migration_data directory if it doesn't exist
    os.makedirs('migration_data', exist_ok=True)
    
    print("Starting Django to MongoDB migration...\n")
    
    try:
        export_officers()
        export_mentors()
        export_events()
        export_blog_posts()
        export_backgrounds()
        export_home_info()
        export_about_sections()
        
        print("\n✓ Migration completed successfully!")
        print("\nNext steps:")
        print("1. Copy the 'migration_data' folder to your server")
        print("2. Use the import script to load data into MongoDB")
        print("3. Copy media files from 'media/' to 'server/uploads/'")
        
    except Exception as e:
        print(f"\n✗ Error during migration: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()
