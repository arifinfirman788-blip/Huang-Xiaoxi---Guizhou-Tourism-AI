
import React from 'react';

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export interface Suggestion {
  id: number;
  text: string;
  icon?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export interface ExpertProfile {
  id: string;
  image: string;
}

export type TagLevel = 'primary' | 'highlight' | 'secondary' | 'tertiary';

export interface Tag {
  text: string;
  level: TagLevel;
}

export interface ServiceItem {
  id: string;
  name: string;
  avatarUrl: string;
  isVerified: boolean;
  verifiedLabel?: string;
  organizationName: string;
  organizationRank?: string;
  description: string;
  tags: Tag[];
  consultationCount: number;
  score?: number;
  promptQuestion: string;
  category: string; // 'agency' | 'guide' | 'hotel' | 'spot' | 'car' | 'food'
}

// --- Agency & Guide Side Types ---

export type UserRole = 'tourist' | 'agency' | 'guide';

export interface ModificationRequest {
  id: string;
  requestTime: string;
  guideName: string;
  reason: string;
  targetEventIds: string[]; // IDs of events the guide wants to change
  status: 'pending' | 'approved' | 'rejected';
}

export interface AgencyItinerary {
  id: string;
  title: string;
  date: string;
  groupCode: string;
  status: 'planning' | 'active' | 'completed';
  touristCount: number;
  complianceScore: number;
  vehicleStatus: 'unregistered' | 'processing' | 'registered'; // Changed from subsidyStatus
  guideName: string;
  driverName: string;
  modificationRequest?: ModificationRequest; // New: Optional pending request
}

export interface PolicyItem {
  id: string;
  title: string;
  date: string;
  tags: string[];
  summary?: string; // AI Summary
  isSubsidyRelated: boolean;
}

export interface Complaint {
  id: string;
  touristName: string;
  level: 'general' | 'critical';
  content: string;
  status: 'pending' | 'processing' | 'resolved';
  time: string;
}

// --- Trip Tracking Specific Types ---

export interface TrackingEvent {
  id: string;
  time: string;
  title: string;
  type: 'spot' | 'hotel' | 'food' | 'transport';
  status: 'completed' | 'pending' | 'skipped';
  checkInTime?: string;
  operator: string; // Name of guide/driver who checked in
  evidence?: {
    type: 'image' | 'video' | 'audio';
    url: string;
    timestamp: string;
  }[];
  isDeviated?: boolean; // New: Flag for schedule deviation
  deviationReason?: string; // New: AI reason for deviation
}

export interface TouristInfo {
  id: string;
  name: string;
  phone: string;
  idCard: string;
  checkInStatus: 'checked' | 'unchecked';
}

export interface TripResource {
  id: string;
  type: 'hotel' | 'restaurant' | 'vehicle' | 'spot';
  name: string;
  contact: string;
  status: 'confirmed' | 'pending';
}

export interface TripReport {
  id: string;
  tripId: string;
  generatedAt: string;
  overallScore: number;
  ratingLevel: 'S' | 'A' | 'B' | 'C';
  aiSummary: string;
  dimensions: {
    guide: { score: number; comment: string };
    driver: { score: number; comment: string };
    schedule: { score: number; comment: string };
    resources: { score: number; comment: string };
  };
  touristFeedback: {
    positiveRatio: number; // 0-100
    keywords: string[];
    summary: string;
  };
}

// --- Evaluation Types ---
export interface TripEvaluation {
  overall: number;
  service: number;
  guide: number;
  driver: number;
  spot: number;
  hotel: number;
  food: number;
  car: number;
  favoritePart: string;
  comment: string;
}
