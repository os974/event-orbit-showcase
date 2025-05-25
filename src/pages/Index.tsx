
import React, { useState } from 'react';
import { EventForm } from '@/components/EventForm';
import { EventList } from '@/components/EventList';
import { Header } from '@/components/Header';
import { EmptyState } from '@/components/EmptyState';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { useAuth } from '@/hooks/useAuth';
import { useEvents } from '@/hooks/useEvents';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const { events, loadingEvents, addEvent } = useEvents(user);
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const handleSignOut = async () => {
    await signOut();
    setShowForm(false);
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  const handleAddEvent = async (eventData: any) => {
    await addEvent(eventData);
    setShowForm(false);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header
        user={user}
        showForm={showForm}
        onToggleForm={() => setShowForm(!showForm)}
        onSignOut={handleSignOut}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Form */}
        {showForm && user && (
          <div className="mb-8 animate-in slide-in-from-top duration-300">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Create New Event</h2>
              <EventForm onSubmit={handleAddEvent} />
            </div>
          </div>
        )}

        {/* Search and Filter */}
        {events.length > 0 && (
          <SearchAndFilter
            searchTerm={searchTerm}
            filterCategory={filterCategory}
            onSearchChange={setSearchTerm}
            onFilterChange={setFilterCategory}
          />
        )}

        {/* Events Display */}
        {loadingEvents ? (
          <div className="text-center py-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading events...</p>
            </div>
          </div>
        ) : events.length === 0 ? (
          <EmptyState user={user} onCreateEvent={() => setShowForm(true)} />
        ) : (
          <EventList events={filteredEvents} />
        )}
      </main>
    </div>
  );
};

export default Index;
