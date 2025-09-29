from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Event
from .serializers import EventSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return events of the logged-in user
        return Event.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically assign the event to the logged-in user
        serializer.save(user=self.request.user)