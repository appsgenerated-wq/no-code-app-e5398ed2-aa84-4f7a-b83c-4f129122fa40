import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [concepts, setConcepts] = useState([]);
  const [newConcept, setNewConcept] = useState({ title: '', explanation: '', proponent: 'Newton', category: '' });
  const [isLoading, setIsLoading] = useState(true);

  const loadConcepts = async () => {
    setIsLoading(true);
    try {
      const response = await manifest.from('Concept').find({ 
        include: ['author'],
        sort: { createdAt: 'desc' }
      });
      setConcepts(response.data);
    } catch (error) {
      console.error('Failed to load concepts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadConcepts();
  }, []);

  const handleCreateConcept = async (e) => {
    e.preventDefault();
    if (!newConcept.title || !newConcept.category) {
        alert('Title and category are required.');
        return;
    }
    try {
      await manifest.from('Concept').create(newConcept);
      setNewConcept({ title: '', explanation: '', proponent: 'Newton', category: '' });
      loadConcepts(); // Refresh the list
    } catch (error) {
      console.error('Failed to create concept:', error);
      alert('Could not create concept. Please try again.');
    }
  };

  const handleDeleteConcept = async (conceptId) => {
    if (window.confirm('Are you sure you want to delete this concept?')) {
        try {
            await manifest.from('Concept').delete(conceptId);
            loadConcepts(); // Refresh the list
        } catch (error) {
            console.error('Failed to delete concept:', error);
            alert('You can only delete your own concepts.');
        }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}!</h1>
            <p className="text-gray-500">Share a new concept or browse existing ones.</p>
          </div>
          <div className="space-x-4">
             <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Admin Panel</a>
            <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Add a New Concept</h2>
              <form onSubmit={handleCreateConcept} className="space-y-4">
                <input type="text" placeholder="Title" value={newConcept.title} onChange={(e) => setNewConcept({...newConcept, title: e.target.value})} className="w-full p-2 border rounded-md" required />
                <textarea placeholder="Explanation" value={newConcept.explanation} onChange={(e) => setNewConcept({...newConcept, explanation: e.target.value})} className="w-full p-2 border rounded-md" rows="4" />
                <input type="text" placeholder="Category (e.g., Calculus)" value={newConcept.category} onChange={(e) => setNewConcept({...newConcept, category: e.target.value})} className="w-full p-2 border rounded-md" required />
                <select value={newConcept.proponent} onChange={(e) => setNewConcept({...newConcept, proponent: e.target.value})} className="w-full p-2 border rounded-md bg-white">
                  <option>Newton</option>
                  <option>Lagrange</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors">
                  Publish Concept
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Published Concepts</h2>
            {isLoading ? (
              <p className="text-gray-500">Loading concepts...</p>
            ) : concepts.length === 0 ? (
              <p className="text-gray-500 bg-white p-6 rounded-lg shadow">No concepts have been published yet. Be the first!</p>
            ) : (
              <div className="space-y-4">
                {concepts.map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow p-5 relative">
                     {item.author?.id === user.id && (
                        <button onClick={() => handleDeleteConcept(item.id)} className='absolute top-4 right-4 text-gray-400 hover:text-red-600'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        </button>
                    )}
                    <div className={`text-sm font-bold uppercase tracking-wider ${item.proponent === 'Newton' ? 'text-blue-600' : 'text-green-600'}`}>{item.proponent}</div>
                    <h3 className="font-bold text-xl text-gray-900 mt-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 font-medium">Category: {item.category}</p>
                    <p className="text-gray-700 mt-2">{item.explanation}</p>
                    <p className="text-xs text-gray-400 mt-4">By {item.author?.name || 'Unknown'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
