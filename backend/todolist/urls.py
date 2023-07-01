from django.urls import path
from .views import GetTodoListView, UpdateTodoListView, DeleteTodoListView, AddTodoListView


urlpatterns = [
    path("", GetTodoListView.as_view()),
    path("add", AddTodoListView.as_view()),
    path("update/<str:pk>", UpdateTodoListView.as_view()),
    path("delete/<str:pk>", DeleteTodoListView.as_view()),
    # path("<str:pk>", views.getNote, name="note"),
]
