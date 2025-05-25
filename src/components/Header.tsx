
import React from 'react';
import { Calendar, Plus, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';

interface HeaderProps {
  user: User | null;
  showForm: boolean;
  onToggleForm: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, showForm, onToggleForm, onSignOut }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                EventPro
              </h1>
              <p className="text-sm text-slate-600">Professional Event Management</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-slate-600">
                  Welcome, {user.email}
                </span>
                <Button
                  onClick={onToggleForm}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {showForm ? 'Cancel' : 'Create Event'}
                </Button>
                <Button
                  onClick={onSignOut}
                  variant="outline"
                  className="border-slate-300 hover:bg-slate-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
