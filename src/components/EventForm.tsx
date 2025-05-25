
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, MapPin, Users, DollarSign, Mail, User } from 'lucide-react';

interface Event {
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

interface EventFormProps {
  onSubmit: (event: Event) => void;
}

export const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'conference' as Event['category'],
    capacity: '',
    organizer: '',
    email: '',
    price: '',
    image_url: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const event: Event = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      category: formData.category,
      capacity: parseInt(formData.capacity),
      organizer: formData.organizer,
      email: formData.email,
      price: parseFloat(formData.price),
      image_url: formData.image_url || `https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=300&fit=crop`
    };

    onSubmit(event);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'conference',
      capacity: '',
      organizer: '',
      email: '',
      price: '',
      image_url: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Title */}
        <div className="md:col-span-2">
          <Label htmlFor="title" className="text-slate-700 font-medium">Event Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 bg-white/80 border-slate-200"
            placeholder="Enter event title"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="mt-1 bg-white/80 border-slate-200"
            placeholder="Describe your event"
          />
        </div>

        {/* Date */}
        <div>
          <Label htmlFor="date" className="text-slate-700 font-medium flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Date
          </Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 bg-white/80 border-slate-200"
          />
        </div>

        {/* Time */}
        <div>
          <Label htmlFor="time" className="text-slate-700 font-medium">Time</Label>
          <Input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="mt-1 bg-white/80 border-slate-200"
          />
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location" className="text-slate-700 font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 bg-white/80 border-slate-200"
            placeholder="Event location"
          />
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category" className="text-slate-700 font-medium">Category</Label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 bg-white/80 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="conference">Conference</option>
            <option value="workshop">Workshop</option>
            <option value="seminar">Seminar</option>
            <option value="networking">Networking</option>
            <option value="training">Training</option>
            <option value="webinar">Webinar</option>
          </select>
        </div>

        {/* Capacity */}
        <div>
          <Label htmlFor="capacity" className="text-slate-700 font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Capacity
          </Label>
          <Input
            id="capacity"
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
            required
            min="1"
            className="mt-1 bg-white/80 border-slate-200"
            placeholder="Max attendees"
          />
        </div>

        {/* Price */}
        <div>
          <Label htmlFor="price" className="text-slate-700 font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Price ($)
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 bg-white/80 border-slate-200"
            placeholder="0.00"
          />
        </div>

        {/* Organizer */}
        <div>
          <Label htmlFor="organizer" className="text-slate-700 font-medium flex items-center gap-2">
            <User className="h-4 w-4" />
            Organizer
          </Label>
          <Input
            id="organizer"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            required
            className="mt-1 bg-white/80 border-slate-200"
            placeholder="Organizer name"
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-slate-700 font-medium flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 bg-white/80 border-slate-200"
            placeholder="contact@example.com"
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <Label htmlFor="image_url" className="text-slate-700 font-medium">Image URL (Optional)</Label>
          <Input
            id="image_url"
            name="image_url"
            type="url"
            value={formData.image_url}
            onChange={handleChange}
            className="mt-1 bg-white/80 border-slate-200"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        Create Event
      </Button>
    </form>
  );
};
