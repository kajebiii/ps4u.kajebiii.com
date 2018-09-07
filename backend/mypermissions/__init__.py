from rest_framework import permissions


class IsAdminUserOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_staff or request.method in ['GET', 'HEAD', 'OPTIONS']