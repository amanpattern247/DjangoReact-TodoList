import django.contrib.auth.models
from django.shortcuts import render
from .models import TodoList
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from todolist.models import TodoList
from todolist.serializers import TodoListSerializer


@api_view(["GET"])
def getNotes(request):
    if request.user.is_authenticated:
        values = TodoList.objects.filter(user=request.user)
        serializers = TodoListSerializer(values, many=True)
        return Response(serializers.data)
    else:
        return Response({"error": "Unauthenticated!"})


@api_view(["GET"])
def getNote(request, pk):
    values = TodoList.objects.get(id=pk)
    serializers = TodoListSerializer(values, many=False)
    return Response(serializers.data)


@api_view(["PUT"])
def updateNote(request, pk):
    data = request.data
    note = TodoList.objects.get(id=pk)
    serializer = TodoListSerializer(instance=note, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
