from django.shortcuts import render, get_object_or_404
from .models import StudentOfficer, Event, Contact, BlogPost, PageBackground, Mentor, EventGalleryItem, HomeInformation, AboutSection
from django.utils import timezone
from django.core.paginator import Paginator
from django.core.mail import send_mail
from django.conf import settings


def get_page_background(page_name):
    try:
        return PageBackground.objects.get(page=page_name, is_active=True)
    except PageBackground.DoesNotExist:
        return None

def index(request):
    background = get_page_background('home')
    home_sections = HomeInformation.objects.filter(is_active=True)
    context = {
        'background': background,
        'home_sections': home_sections
    }
    return render(request, 'core/index.html', context)

def about(request):
    students = StudentOfficer.objects.filter(is_active=True).order_by('order', 'name')
    mentors = Mentor.objects.filter(is_active=True).order_by('order', 'name')
    background = get_page_background('about')
    
    # Get active about sections
    about_sections = AboutSection.objects.filter(is_active=True)
    
    context = {
        'students': students,
        'mentors': mentors,
        'background': background,
        'about_sections': about_sections
    }
    return render(request, 'core/about.html', context)

def contact(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        if first_name and last_name and email and subject and message:  # Simple validation
            Contact.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=email,
                subject=subject,
                message=message,
                created_at=timezone.now()
            )
            send_mail(
                'You have a new message from ' + first_name + ' ' + last_name,
                'Email: ' + email + '\n\n' + 'Subject: ' + subject + '\n\n' + 'Message: ' + message,
                settings.DEFAULT_FROM_EMAIL,
                ['smptpchecking@gmail.com'],
                fail_silently=False)
            message = "Thank you for contacting us. We will get back to you soon!"
        else:
            message = "Please fill in all the fields."

        background = get_page_background('contact')  # Ensure this function exists
        context = {
            'message': message,
            'background': background
        }
        return render(request, 'core/contact.html', context)

    background = get_page_background('contact')  # Ensure this function is defined somewhere
    return render(request, 'core/contact.html', {'background': background})

def events(request):
    now = timezone.now().date()
    active_events = Event.objects.filter(date__gte=now).order_by('date')
    past_events_list = Event.objects.filter(date__lt=now).order_by('-date')
    
    # Paginate past events - 8 per page
    paginator = Paginator(past_events_list, 8)
    page = request.GET.get('page')
    past_events = paginator.get_page(page)
    
    background = get_page_background('events')
    context = {
        'active_events': active_events,
        'past_events': past_events,
        'background': background
    }
    return render(request, 'core/events.html', context)

def event_detail(request, slug):
    event = get_object_or_404(Event, slug=slug)
    gallery_items = event.gallery_items.all() if event.has_gallery else None
    today = timezone.now().date()
    
    context = {
        'event': event,
        'gallery_items': gallery_items,
        'today': today,
    }
    return render(request, 'core/event_detail.html', context)

def members(request):
    background = get_page_background('members')
    context = {
        'background': background
    }
    return render(request, 'core/members.html', context)

def blog(request):
    post_list = BlogPost.objects.filter(is_published=True).order_by('-created_at')
    paginator = Paginator(post_list, 6)  # Show 6 posts per page
    page = request.GET.get('page')
    posts = paginator.get_page(page)
    background = get_page_background('blog')
    context = {
        'posts': posts,
        'background': background
    }
    return render(request, 'core/blog.html', context)

def blog_detail(request, slug):
    post = get_object_or_404(BlogPost, slug=slug, is_published=True)
    return render(request, 'core/blog_detail.html', {'post': post})



