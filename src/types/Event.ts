
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'conference' | 'workshop' | 'seminar' | 'networking' | 'training' | 'webinar';
  capacity: number;
  organizer: string;
  email: string;
  price: number;
  imageUrl?: string;
}
