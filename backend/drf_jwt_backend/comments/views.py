from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .serializers import CommentSerializer, ReplySerializer
from .models import Comment



@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_comments(request, video_id):
    comments = Comment.objects.filter(video_id=video_id)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)






@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_comments(request):
    print('User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer= CommentSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_comment(request, comment_id):
    if request.method == 'PUT':    
        # get the record that needs to be updated
        # use commment_id for this
        
        serializer = CommentSerializer(Comment, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

#Maybe duplicate GET and POST for Replies and change words accordingly

# @api_view(['PUT'])
