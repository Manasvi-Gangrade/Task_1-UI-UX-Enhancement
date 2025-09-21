import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Mail, 
  Building, 
  Award, 
  MessageCircle, 
  Send,
  User,
  TrendingUp,
  Clock
} from 'lucide-react';
import { mockCoordinators, mockWorkshops } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: '1',
      author: 'Dr. Suresh Reddy',
      content: 'Great job organizing the Python workshop! The students were very engaged.',
      timestamp: '2 hours ago',
      avatar: 'SR'
    },
    {
      id: '2',
      author: 'Prof. Kavita Jain',
      content: 'Looking forward to collaborating on the upcoming ML workshop series.',
      timestamp: '1 day ago',
      avatar: 'KJ'
    }
  ]);
  const { toast } = useToast();

  // Using first coordinator as current user
  const currentUser = mockCoordinators[0];
  const userWorkshops = mockWorkshops.filter(w => w.coordinator === currentUser.name);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      author: 'You',
      content: newComment,
      timestamp: 'Just now',
      avatar: 'YO'
    };

    setComments([comment, ...comments]);
    setNewComment('');
    
    toast({
      title: "Comment Added",
      description: "Your comment has been posted successfully.",
    });
  };

  const getStatusStats = () => {
    return userWorkshops.reduce((acc, workshop) => {
      acc[workshop.status] = (acc[workshop.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const statusStats = getStatusStats();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile and view your workshop statistics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                    {currentUser.avatar}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{currentUser.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{currentUser.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{currentUser.department}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>{currentUser.totalWorkshops} Total Workshops</span>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="shadow-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-accepted/10 rounded-lg">
                    <div className="text-xl font-bold text-accepted">
                      {statusStats.accepted || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Accepted</div>
                  </div>
                  <div className="text-center p-3 bg-pending/10 rounded-lg">
                    <div className="text-xl font-bold text-pending">
                      {statusStats.pending || 0}
                    </div>             
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-rejected/10 rounded-lg">
                    <div className="text-xl font-bold text-rejected">
                      {statusStats.rejected || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Rejected</div>
                  </div>
                  <div className="text-center p-3 bg-postponed/10 rounded-lg">
                    <div className="text-xl font-bold text-postponed">
                      {statusStats.postponed || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Postponed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Workshops */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  My Workshops
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userWorkshops.map((workshop) => (
                    <div key={workshop.id} className="p-4 border rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{workshop.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {workshop.location}, {workshop.state}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(workshop.date).toLocaleDateString('en-IN')}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {workshop.participants} participants
                            </span>
                          </div>
                        </div>
                        <Badge variant={workshop.status as any}>
                          {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Comments & Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Comment */}
                <div className="space-y-3">
                  <Textarea
                    placeholder="Share your thoughts or feedback..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <Button onClick={handleAddComment} className="w-full sm:w-auto">
                    <Send className="h-4 w-4 mr-2" />
                    Post Comment
                  </Button>
                </div>

                <Separator />

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="w-8 h-8 shrink-0">
                        <AvatarFallback className="text-xs bg-secondary">
                          {comment.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{comment.author}</span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {comment.timestamp}
                          </div>
                        </div>
                        <p className="text-sm text-foreground">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;