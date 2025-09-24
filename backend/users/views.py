from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User

@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    # Check if all fields are provided
    if not username or not email or not password:
        return Response({'error': 'All fields are required'}, status=400)

    # Check if username already exists
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)

    # Create user
    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({'message': 'User created successfully'})