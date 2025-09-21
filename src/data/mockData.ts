export interface Workshop {
  id: string;
  title: string;
  type: string;
  coordinator: string;
  location: string;
  state: string;
  date: string;
  status: 'pending' | 'accepted' | 'rejected' | 'postponed';
  participants: number;
  description: string;
}

export interface Coordinator {
  id: string;
  name: string;
  email: string;
  department: string;
  totalWorkshops: number;
  avatar: string;
}

export interface DashboardStats {
  monthlyWorkshops: number;
  upcomingWorkshops: number;
  totalCoordinators: number;
  workshopTypes: {
    name: string;
    value: number;
    color: string;
  }[];
}

export const mockWorkshops: Workshop[] = [
  {
    id: '1',
    title: 'Python for Scientific Computing',
    type: 'Programming',
    coordinator: 'Dr. Rajesh Kumar',
    location: 'Mumbai',
    state: 'Maharashtra',
    date: '2024-10-15',
    status: 'accepted',
    participants: 45,
    description: 'Introduction to Python libraries for scientific computing including NumPy, SciPy, and Matplotlib.'
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    type: 'AI/ML',
    coordinator: 'Prof. Priya Sharma',
    location: 'Bangalore',
    state: 'Karnataka',
    date: '2024-10-20',
    status: 'pending',
    participants: 60,
    description: 'Comprehensive workshop covering machine learning algorithms and practical implementations.'
  },
  {
    id: '3',
    title: 'Web Development with React',
    type: 'Web Development',
    coordinator: 'Dr. Amit Patel',
    location: 'Chennai',
    state: 'Tamil Nadu',
    date: '2024-10-25',
    status: 'rejected',
    participants: 35,
    description: 'Modern web development using React, hooks, and state management.'
  },
  {
    id: '4',
    title: 'Data Science with R',
    type: 'Data Science',
    coordinator: 'Prof. Sunita Gupta',
    location: 'Delhi',
    state: 'Delhi',
    date: '2024-11-02',
    status: 'postponed',
    participants: 50,
    description: 'Statistical analysis and data visualization using R programming language.'
  },
  {
    id: '5',
    title: 'IoT Workshop',
    type: 'Hardware',
    coordinator: 'Dr. Vikram Singh',
    location: 'Pune',
    state: 'Maharashtra',
    date: '2024-11-10',
    status: 'accepted',
    participants: 30,
    description: 'Hands-on workshop on Internet of Things with Arduino and Raspberry Pi.'
  },
  {
    id: '6',
    title: 'Blockchain Technology',
    type: 'Blockchain',
    coordinator: 'Prof. Anita Desai',
    location: 'Hyderabad',
    state: 'Telangana',
    date: '2024-11-15',
    status: 'pending',
    participants: 40,
    description: 'Understanding blockchain technology and cryptocurrency development.'
  }
];

export const mockCoordinators: Coordinator[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@iitb.ac.in',
    department: 'Computer Science',
    totalWorkshops: 12,
    avatar: 'RK'
  },
  {
    id: '2',
    name: 'Prof. Priya Sharma',
    email: 'priya.sharma@iitb.ac.in',
    department: 'Data Science',
    totalWorkshops: 8,
    avatar: 'PS'
  },
  {
    id: '3',
    name: 'Dr. Amit Patel',
    email: 'amit.patel@iitb.ac.in',
    department: 'Information Technology',
    totalWorkshops: 15,
    avatar: 'AP'
  }
];

export const dashboardStats: DashboardStats = {
  monthlyWorkshops: 24,
  upcomingWorkshops: 8,
  totalCoordinators: 15,
  workshopTypes: [
    { name: 'Programming', value: 35, color: '#0ea5e9' },
    { name: 'AI/ML', value: 25, color: '#10b981' },
    { name: 'Web Development', value: 20, color: '#f59e0b' },
    { name: 'Data Science', value: 15, color: '#8b5cf6' },
    { name: 'Hardware', value: 5, color: '#f97316' }
  ]
};

export const stateCoordinates: { [key: string]: [number, number] } = {
  'Maharashtra': [19.7515, 75.7139],
  'Karnataka': [15.3173, 75.7139],
  'Tamil Nadu': [11.1271, 78.6569],
  'Delhi': [28.7041, 77.1025],
  'Telangana': [18.1124, 79.0193],
  'Kerala': [10.8505, 76.2711],
  'Gujarat': [23.0225, 72.5714],
  'Rajasthan': [27.0238, 74.2179],
  'West Bengal': [22.9868, 87.8550],
  'Uttar Pradesh': [26.8467, 80.9462]
};