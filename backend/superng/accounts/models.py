from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ADMIN = 'admin'
    USER = 'user'
    MEMBER = 'member'
    GUEST = 'guest'

    ROLE_CHOICES = [
        (ADMIN, 'Admin'),
        (USER, 'User'),
        (MEMBER, 'Member'),
        (GUEST, 'Guest'),
    ]

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=USER)

    def __str__(self):
        return f"{self.username} ({self.role})"
