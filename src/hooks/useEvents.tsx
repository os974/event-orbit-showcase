
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

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
  user_id?: string;
}

export const useEvents = (user: User | null) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const { toast } = useToast();

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      
      // Cast the data to ensure type safety
      const typedEvents = (data || []).map(event => ({
        ...event,
        category: event.category as Event['category']
      }));
      
      setEvents(typedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to load events. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingEvents(false);
    }
  };

  const addEvent = async (eventData: Omit<Event, 'id' | 'user_id'>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create events.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('events')
        .insert([{ ...eventData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      // Cast the returned data to match our Event type
      const typedEvent = {
        ...data,
        category: data.category as Event['category']
      };

      setEvents([...events, typedEvent]);
      toast({
        title: "Success",
        description: "Event created successfully!",
      });
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loadingEvents,
    addEvent,
    fetchEvents
  };
};
