from rest_framework import viewsets, permissions
from .models import Event
from .serializers import EventSerializer

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return events of the logged-in user
        return Event.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically assign the event to the logged-in user
        serializer.save(user=self.request.user)