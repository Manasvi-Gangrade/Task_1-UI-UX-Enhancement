import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, Trash2 } from 'lucide-react';
import { Workshop } from '@/data/mockData';

interface WorkshopCardProps {
  workshop: Workshop;
  onStatusChange: (id: string, status: Workshop['status']) => void;
  onDelete: (id: string) => void;
}

const WorkshopCard = ({ workshop, onStatusChange, onDelete }: WorkshopCardProps) => {
  const getStatusColor = (status: Workshop['status']) => {
    switch (status) {
      case 'accepted':
        return 'accepted';
      case 'rejected':
        return 'rejected';
      case 'pending':
        return 'pending';
      case 'postponed':
        return 'postponed';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Card className="h-full shadow-card hover:shadow-hover transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {workshop.title}
          </CardTitle>
          <Badge variant={getStatusColor(workshop.status)} className="ml-2 shrink-0">
            {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{workshop.type}</p>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {workshop.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(workshop.date)}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {workshop.location}, {workshop.state}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            {workshop.participants} participants
          </div>
        </div>
        
        <p className="text-sm font-medium mt-3">
          Coordinator: {workshop.coordinator}
        </p>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex flex-wrap gap-2 w-full">
          {workshop.status === 'pending' && (
            <>
              <Button
                size="sm"
                variant="default"
                className="bg-accepted hover:bg-accepted/90 text-accepted-foreground"
                onClick={() => onStatusChange(workshop.id, 'accepted')}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onStatusChange(workshop.id, 'rejected')}
              >
                Reject
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-postponed hover:bg-postponed/90 text-postponed-foreground"
                onClick={() => onStatusChange(workshop.id, 'postponed')}
              >
                Postpone
              </Button>
            </>
          )}
          <Button
            size="sm"
            variant="outline"
            className="ml-auto"
            onClick={() => onDelete(workshop.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WorkshopCard;