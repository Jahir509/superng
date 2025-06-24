from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .models import User
from .serializers import UserSerializer, UserCreateSerializer
from rest_framework.renderers import JSONRenderer


def is_admin(user):
    return user.is_authenticated and user.role == 'admin'


@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticated])
@renderer_classes([JSONRenderer])
def user_list_create(request):
    if request.method == 'GET':
        if is_admin(request.user):
            users = User.objects.all()
        else:
            users = User.objects.filter(id=request.user.id)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        if not is_admin(request.user):
            return Response({"detail": "Only admin can create users."}, status=status.HTTP_403_FORBIDDEN)

        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([permissions.IsAuthenticated])
@renderer_classes([JSONRenderer])
def user_detail(request, pk):
    user = get_object_or_404(User, pk=pk)

    # Admins can access all, others only their own profile
    if request.user != user and not is_admin(request.user):
        return Response({"detail": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if not is_admin(request.user):
            return Response({"detail": "Only admin can delete users."}, status=status.HTTP_403_FORBIDDEN)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
