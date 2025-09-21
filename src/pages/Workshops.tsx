import { useState } from 'react';
import Layout from '@/components/Layout';
import WorkshopCard from '@/components/WorkshopCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus } from 'lucide-react';
import { mockWorkshops, Workshop } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Workshops = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>(mockWorkshops);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const { toast } = useToast();

  const filteredWorkshops = workshops.filter((workshop) => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.coordinator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workshop.status === statusFilter;
    const matchesType = typeFilter === 'all' || workshop.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleStatusChange = (id: string, newStatus: Workshop['status']) => {
    setWorkshops(workshops.map(workshop => 
      workshop.id === id ? { ...workshop, status: newStatus } : workshop
    ));
    
    const workshop = workshops.find(w => w.id === id);
    toast({
      title: "Status Updated",
      description: `"${workshop?.title}" has been ${newStatus}.`,
    });
  };

  const handleDelete = (id: string) => {
    const workshop = workshops.find(w => w.id === id);
    setWorkshops(workshops.filter(workshop => workshop.id !== id));
    
    toast({
      title: "Workshop Deleted",
      description: `"${workshop?.title}" has been removed.`,
      variant: "destructive",
    });
  };

  const getStatusCounts = () => {
    return workshops.reduce((acc, workshop) => {
      acc[workshop.status] = (acc[workshop.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const statusCounts = getStatusCounts();
  const workshopTypes = [...new Set(workshops.map(w => w.type))];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Workshops</h1>
            <p className="text-muted-foreground">
              Manage and monitor workshop requests
            </p>
          </div>
          <Button className="bg-gradient-hero hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Add Workshop
          </Button>
        </div>

        {/* Status Overview */}
        <div className="flex flex-wrap gap-4">
          {Object.entries(statusCounts).map(([status, count]) => (
            <Badge
              key={status}
              variant={status as any}
              className="px-3 py-1 text-sm font-medium"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}: {count}
            </Badge>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workshops, coordinators, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="postponed">Postponed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {workshopTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Workshop Grid */}
        {filteredWorkshops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkshops.map((workshop) => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No workshops found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Workshops;