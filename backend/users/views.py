from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

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

# -------------------------------
# NEW: Login view for token auth
# -------------------------------
@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    # Get or create token
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})