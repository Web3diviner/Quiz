import React, { useState } from 'react';
import { useCompetition } from '../context/CompetitionContext';
import { Contestant } from '../types/competition';
import {
  Users,
  Plus,
  FileSpreadsheet,
  Trash2,
  Edit2,
  RotateCcw,
  Play,
  Search,
  School,
  X,
  AlertCircle
} from 'lucide-react';

export const ContestantsPage: React.FC = () => {
  const {
    state,
    addContestant,
    addContestantsBulk,
    updateContestant,
    deleteContestant,
    resetContestantAttempt,
    clearAllContestants,
    startQuiz,
    navigateTo,
  } = useCompetition();

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [editingContestant, setEditingContestant] = useState<Contestant | null>(null);

  // Form states
  const [nameInput, setNameInput] = useState('');
  const [schoolInput, setSchoolInput] = useState('');
  const [bulkTextInput, setBulkTextInput] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    addContestant(nameInput.trim(), schoolInput.trim());
    setNameInput('');
    setSchoolInput('');
    setShowAddModal(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContestant || !nameInput.trim()) return;
    updateContestant(editingContestant.id, {
      name: nameInput.trim(),
      school: schoolInput.trim() || 'Independent',
    });
    setEditingContestant(null);
    setNameInput('');
    setSchoolInput('');
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkTextInput.trim()) return;
    
    // Parse CSV or tab-separated lines
    const lines = bulkTextInput.split('\n');
    const parsed = lines
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        const parts = line.includes(',') ? line.split(',') : line.split('\t');
        return {
          name: parts[0]?.trim() || '',
          school: parts[1]?.trim() || 'Independent',
        };
      });

    addContestantsBulk(parsed);
    setBulkTextInput('');
    setShowBulkModal(false);
  };

  const filteredContestants = state.contestants.filter((c: Contestant) => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col gap-6 sm:gap-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary-light" />
            <h1 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight">
              Contestants
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Add contestants, assign schools, manage quiz queue, and reset individual attempts.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {state.contestants.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to remove all contestants?')) {
                  clearAllContestants();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-card hover:bg-rose-950/60 border border-surface-border text-slate-400 hover:text-rose-300 text-xs font-semibold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Contestants</span>
            </button>
          )}

          <button
            onClick={() => setShowBulkModal(true)}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-surface-card hover:bg-surface-hover border border-surface-border text-slate-300 text-xs font-semibold transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Bulk CSV Import</span>
          </button>

          <button
            onClick={() => {
              setNameInput('');
              setSchoolInput('');
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Contestant</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      {state.contestants.length > 0 && (
        <div className="flex items-center gap-3 p-2.5 sm:p-3 bg-surface-card rounded-2xl border border-surface-border">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 ml-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search contestants by name or school..."
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="p-1 text-slate-400 hover:text-white mr-1">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Contestants List / Empty State */}
      <div className="bg-surface-card rounded-3xl border border-surface-border overflow-hidden shadow-xl">
        {state.contestants.length === 0 ? (
          <div className="text-center py-16 sm:py-20 px-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-surface border border-surface-border flex items-center justify-center text-slate-500 mx-auto mb-4">
              <Users className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2">No contestants have been added yet.</h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-6">
              Register contestants representing different schools to begin the competition.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-5 sm:px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/20 transition-all"
              >
                Add First Contestant
              </button>
              <button
                onClick={() => setShowBulkModal(true)}
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-surface hover:bg-surface-hover border border-surface-border text-slate-300 text-xs font-semibold"
              >
                Bulk Import CSV
              </button>
            </div>
          </div>
        ) : filteredContestants.length === 0 ? (
          <div className="text-center py-14 px-4">
            <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="font-display font-bold text-base sm:text-lg text-white mb-1">No Matching Contestants</h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto mb-4">
              No contestants match your search "{searchTerm}".
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 rounded-xl bg-surface border border-surface-border text-slate-300 text-xs font-semibold"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-surface-border bg-surface/50">
                  <th className="py-3.5 px-4">No.</th>
                  <th className="py-3.5 px-4">Contestant</th>
                  <th className="py-3.5 px-4">School</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Score</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/50">
                {filteredContestants.map((c: Contestant, index: number) => {
                  let statusBadge = (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-400">
                      Not Started
                    </span>
                  );

                  if (c.status === 'playing') {
                    statusBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                        In Arena
                      </span>
                    );
                  } else if (c.status === 'completed') {
                    statusBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary-light border border-primary/30">
                        Completed
                      </span>
                    );
                  } else if (c.status === 'eliminated') {
                    statusBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Eliminated
                      </span>
                    );
                  }

                  return (
                    <tr key={c.id} className="hover:bg-surface-hover/50 transition-colors">
                      <td className="py-3.5 sm:py-4 px-4 font-mono text-slate-500 text-xs">
                        {index + 1}
                      </td>
                      <td className="py-3.5 sm:py-4 px-4 font-bold text-white">
                        {c.name}
                      </td>
                      <td className="py-3.5 sm:py-4 px-4 text-slate-300 flex items-center gap-1.5">
                        <School className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{c.school}</span>
                      </td>
                      <td className="py-3.5 sm:py-4 px-4">
                        {statusBadge}
                      </td>
                      <td className="py-3.5 sm:py-4 px-4 text-right font-mono font-bold text-gold">
                        {c.score} pts
                      </td>
                      <td className="py-3.5 sm:py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {c.status === 'not_started' ? (
                            <button
                              onClick={() => startQuiz(c.id)}
                              className="px-3 py-1 rounded-lg bg-gold hover:bg-gold-light text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Start Quiz</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => navigateTo('results', c.id)}
                              className="px-2.5 py-1 rounded-lg bg-surface hover:bg-surface-hover border border-surface-border text-slate-300 text-xs font-medium"
                            >
                              Result
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setEditingContestant(c);
                              setNameInput(c.name);
                              setSchoolInput(c.school);
                            }}
                            title="Edit Contestant"
                            className="p-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-surface-border text-slate-400 hover:text-white"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Reset attempt and score for ${c.name}?`)) {
                                resetContestantAttempt(c.id);
                              }
                            }}
                            title="Reset Attempt"
                            className="p-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-surface-border text-slate-400 hover:text-gold"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete contestant "${c.name}" permanently?`)) {
                                deleteContestant(c.id);
                              }
                            }}
                            title="Delete Contestant"
                            className="p-1.5 rounded-lg bg-surface hover:bg-rose-950/60 border border-surface-border text-slate-400 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Contestant Modal */}
      {(showAddModal || editingContestant) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-surface-card rounded-3xl border border-primary/40 p-5 sm:p-6 shadow-2xl relative my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                {editingContestant ? 'Edit Contestant' : 'Add New Contestant'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingContestant(null);
                }}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingContestant ? handleEditSubmit : handleAddSubmit} className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Contestant Name *
                </label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. Adebayo Adeleke"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-white text-xs sm:text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  School Represented *
                </label>
                <input
                  type="text"
                  required
                  value={schoolInput}
                  onChange={(e) => setSchoolInput(e.target.value)}
                  placeholder="e.g. Federal Government College"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-white text-xs sm:text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-border">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingContestant(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover border border-surface-border text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/30"
                >
                  {editingContestant ? 'Save Changes' : 'Add Contestant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk CSV Import Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-surface-card rounded-3xl border border-primary/40 p-5 sm:p-6 shadow-2xl relative my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <h3 className="font-display font-bold text-base sm:text-lg text-white">
                  Bulk Add Contestants
                </h3>
              </div>
              <button onClick={() => setShowBulkModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBulkSubmit} className="py-4 space-y-3">
              <p className="text-xs text-slate-400 leading-relaxed">
                Paste contestant names and schools below. Put one entry per line formatted as: <br />
                <code className="text-gold font-mono font-semibold">Contestant Name, School Name</code>
              </p>

              <textarea
                rows={6}
                value={bulkTextInput}
                onChange={(e) => setBulkTextInput(e.target.value)}
                placeholder={`Adebayo Adeleke, Federal College\nFatima Umar, Unity School\nEmeka Obi, Corona Secondary School`}
                className="w-full p-3 rounded-xl bg-surface border border-surface-border text-white text-xs font-mono focus:outline-none focus:border-primary resize-y"
              />

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-border">
                <button
                  type="button"
                  onClick={() => setShowBulkModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover border border-surface-border text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!bulkTextInput.trim()}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg disabled:opacity-40"
                >
                  Import Contestants
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
