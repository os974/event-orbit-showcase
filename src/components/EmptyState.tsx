
import React from 'react';
import { Calendar, Plus, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';

interface EmptyStateProps {
  user: User | null;
  onCreateEvent: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ user, onCreateEvent }) => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-16">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12">
        <Calendar className="h-16 w-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-700 mb-2">No Events Yet</h3>
        <p className="text-slate-600 mb-6">
          {user ? 'Start by creating your first professional event' : 'Sign in to create and manage events'}
        </p>
        {user ? (
          <Button
            onClick={onCreateEvent}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Event
          </Button>
        ) : (
          <Button
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            <LogIn className="h-4 w-4 mr-2" />
            Sign In to Get Started
          </Button>
        )}
      </div>
    </div>
  );
};
