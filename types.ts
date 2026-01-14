
export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  GUEST = 'GUEST'
}

export enum ProjectStatus {
  STRATEGY = 'Strategy',
  DESIGN = 'Design',
  DEVELOPMENT = 'Development',
  TESTING = 'Testing',
  DEPLOYED = 'Deployment'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Project {
  id: string;
  clientId: string;
  title: string;
  status: ProjectStatus;
  progress: number;
  deadline: string;
  description: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  status: 'New' | 'Qualified' | 'Contracted';
  createdAt: string;
}

export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

export interface FileAsset {
  id: string;
  projectId: string;
  name: string;
  url: string;
  type: 'deliverable' | 'asset';
  uploadedAt: string;
}
