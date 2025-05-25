
import React from 'react';
import { EventCard } from '@/components/EventCard';

interface Event {
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
  image_url?: string;
}

interface EventListProps {
  events: Event[];
}

export const EventList: React.FC<EventListProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <p className="text-slate-600 text-lg">No events match your search criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
          Upcoming Events ({events.length})
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="animate-in slide-in-from-bottom duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};
