from django.core.management.base import BaseCommand
from accounts.models import User

class Command(BaseCommand):
    help = 'Seed the database with default users'

    def handle(self, *args, **kwargs):
        roles = ['admin', 'user', 'member', 'guest']
        for role in roles:
            User.objects.get_or_create(
                username=role,
                defaults={
                    'email': f'{role}@example.com',
                    'role': role,
                    'is_staff': role == 'admin',
                    'is_superuser': role == 'admin',
                }
            )
            user = User.objects.get(username=role)
            user.set_password('password123')
            user.save()
        self.stdout.write(self.style.SUCCESS('Default users created.'))
