from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import TodoList
from .serializers import TodoListSerializer


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetTodoListView(APIView):
    def get(self, request):
        values = TodoList.objects.all()
        serializers = TodoListSerializer(values, many=True)
        return Response(serializers.data)


@method_decorator(ensure_csrf_cookie, name="dispatch")
class AddTodoListView(APIView):
    def post(self, request):
        data = request.data
        serializer = TodoListSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(ensure_csrf_cookie, name="dispatch")
class UpdateTodoListView(APIView):
    def get(self, request, pk):
        values = TodoList.objects.get(id=pk)
        serializers = TodoListSerializer(values, many=False)
        return Response(serializers.data)

    def patch(self, request, pk):
        data = request.data
        note = TodoList.objects.get(id=pk)
        serializer = TodoListSerializer(instance=note, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(ensure_csrf_cookie, name="dispatch")
class DeleteTodoListView(APIView):
    def delete(self, request, pk):
        note = TodoList.objects.get(id=pk)
        note.delete()
        return Response("Item successfully deleted")
