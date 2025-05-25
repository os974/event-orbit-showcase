
import React from 'react';
import { Event } from '@/types/Event';
import { CalendarIcon, MapPin, Users, DollarSign, Mail, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      conference: 'bg-blue-100 text-blue-800 border-blue-200',
      workshop: 'bg-green-100 text-green-800 border-green-200',
      seminar: 'bg-purple-100 text-purple-800 border-purple-200',
      networking: 'bg-orange-100 text-orange-800 border-orange-200',
      training: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      webinar: 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors[category as keyof typeof colors] || colors.conference;
  };

  const isPriceValid = !isNaN(event.price) && event.price >= 0;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-white/20 overflow-hidden">
      <div className="relative">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=300&fit=crop';
          }}
        />
        <div className="absolute top-4 left-4">
          <Badge className={`${getCategoryColor(event.category)} border`}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-semibold text-slate-800">
            {isPriceValid ? (event.price === 0 ? 'Free' : `$${event.price}`) : 'TBD'}
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
          {event.title}
        </h3>
        <p className="text-slate-600 text-sm line-clamp-2">{event.description}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarIcon className="h-4 w-4 text-blue-500" />
          <span>{formatDate(event.date)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock className="h-4 w-4 text-green-500" />
          <span>{formatTime(event.time)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="h-4 w-4 text-red-500" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Users className="h-4 w-4 text-purple-500" />
          <span>Capacity: {event.capacity} attendees</span>
        </div>

        <div className="border-t border-slate-200 pt-3 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Mail className="h-4 w-4 text-orange-500" />
              <span className="line-clamp-1">{event.organizer}</span>
            </div>
            {isPriceValid && (
              <div className="flex items-center gap-1 text-lg font-bold text-slate-800">
                <DollarSign className="h-4 w-4" />
                {event.price === 0 ? 'Free' : event.price.toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
