import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Users, Plus, Send } from 'lucide-react';
import { useFarmily } from '../contexts/FarmilyContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useToast } from '../hooks/use-toast';

export const Community: React.FC = () => {
  const { community, likePost, addPost } = useFarmily();
  const { toast } = useToast();
  const [newPostText, setNewPostText] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLike = (postId: string) => {
    likePost(postId);
    toast({
      title: "Liked! ❤️",
      description: "Showing support for fellow gardeners",
    });
  };

  const handleComment = (author: string) => {
    toast({
      title: "Comment feature",
      description: `Would open comment dialog for ${author}'s post`,
    });
  };

  const handleShare = (author: string) => {
    toast({
      title: "Shared! 📤",
      description: `${author}'s post shared with your network`,
    });
  };

  const handleNewPost = () => {
    if (newPostText.trim()) {
      addPost(newPostText.trim());
      setNewPostText('');
      setIsDialogOpen(false);
      toast({
        title: "Post shared! 🌱",
        description: "Your gardening journey inspires others",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 pb-8">
        <div className="mobile-container">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Users size={24} />
              <div>
                <h1 className="text-2xl font-bold">Community</h1>
                <p className="text-primary-foreground/80">Share & learn together</p>
              </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="flex items-center space-x-2">
                  <Plus size={16} />
                  <span>Post</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="mobile-container">
                <DialogHeader>
                  <DialogTitle>Share with Community</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input
                    placeholder="Share your gardening journey..."
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    maxLength={200}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {newPostText.length}/200
                    </span>
                    <Button 
                      onClick={handleNewPost}
                      disabled={!newPostText.trim()}
                      className="bg-gradient-primary text-primary-foreground"
                    >
                      <Send size={16} className="mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-primary-foreground/10 rounded-lg p-3">
            <p className="text-sm text-primary-foreground/90">
              🤝 Community builds motivation
            </p>
          </div>
        </div>
      </div>

      <div className="mobile-container py-6 space-y-4">
        {/* Community Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{community.length}</div>
            <div className="text-xs text-muted-foreground">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {community.reduce((acc, post) => acc + post.likes, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Likes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {community.reduce((acc, post) => acc + post.comments, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Comments</div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {community.map((post) => (
            <Card key={post.id} className="shadow-soft">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Post Header */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                      {post.author[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{post.author}</h3>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-foreground leading-relaxed">{post.text}</p>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-destructive transition-smooth"
                    >
                      <Heart size={16} className="fill-current" />
                      <span>{post.likes}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleComment(post.author)}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth"
                    >
                      <MessageCircle size={16} />
                      <span>{post.comments}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(post.author)}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-smooth"
                    >
                      <Share2 size={16} />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center pt-4">
          <Button variant="outline" className="w-full">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  );
};