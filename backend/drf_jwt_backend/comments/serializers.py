from rest_framework import serializers
from .models import Comment
from .models import Reply

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['video_id', 'text', 'likes', 'dislikes', 'user_id']
        depth = 1

    user_id = serializers.IntegerField(write_only=True)



class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ['comment', 'text', 'user_id']
        depth = 1

    user_id = serializers.IntegerField(write_only=True)