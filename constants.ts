
import { ProjectStatus, UserRole, User, Project, Lead } from './types';

export const COLORS = {
  background: '#000000',
  surface: '#121212',
  accent: '#38bdf8', // Sky Blue/Cyan from logo
  accentDark: '#0284c7',
  accentRed: '#ef4444', // Red dot color
  textPrimary: '#FFFFFF',
  textSecondary: '#E0E0E0',
};

export const MOCK_USER: User = {
  id: 'user-1',
  name: 'Alex Rivera',
  email: 'alex@jetfuel.io',
  role: UserRole.CLIENT,
  avatar: 'https://picsum.photos/seed/alex/100/100',
};

export const MOCK_ADMIN: User = {
  id: 'admin-1',
  name: 'Sarah Jet',
  email: 'sarah@jetfuel.io',
  role: UserRole.ADMIN,
  avatar: 'https://picsum.photos/seed/sarah/100/100',
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    clientId: 'user-1',
    title: 'Solaris E-Commerce Rebrand',
    status: ProjectStatus.DEVELOPMENT,
    progress: 75,
    deadline: '2024-05-15',
    description: 'A complete overhaul of the Solaris luxury watch e-commerce experience.',
  },
  {
    id: 'proj-2',
    clientId: 'user-1',
    title: 'Neon Pulse Mobile App',
    status: ProjectStatus.DESIGN,
    progress: 40,
    deadline: '2024-06-20',
    description: 'Design phase for the fitness tracking mobile application.',
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'John Doe',
    email: 'john@example.com',
    projectType: 'Web App',
    budget: 'R180,000+',
    timeline: '3 months',
    status: 'New',
    createdAt: '2024-03-01',
  },
  {
    id: 'lead-2',
    name: 'Jane Smith',
    email: 'jane@startup.io',
    projectType: 'UI/UX Design',
    budget: 'R35,000 - R80,000',
    timeline: '1 month',
    status: 'Qualified',
    createdAt: '2024-03-05',
  }
];
