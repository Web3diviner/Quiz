import React, { useState, useMemo } from 'react';
import { useCompetition } from '../context/CompetitionContext';
import { Question, OptionKey, Difficulty } from '../types/competition';
import {
  HelpCircle,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  RotateCcw,
  Trash2,
  Edit2,
  Copy,
  Layers,
  CheckCircle2,
  X,
  AlertCircle,
  Sparkles,
  FileCode2,
} from 'lucide-react';
import { downloadQuestionTemplate, validateQuestionImport } from '../lib/storage';
import { CURRENT_AFFAIRS_SNAPSHOT_DATE } from '../data/sampleQuestions';

export const QuestionsPage: React.FC = () => {
  const {
    state,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    duplicateQuestion,
    importQuestions,
    resetToDefaultQuestions,
    clearAllQuestions,
    showToast,
  } = useCompetition();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Form states
  const [formCategory, setFormCategory] = useState('Nigeria Current Affairs — Sep 2026');
  const [formQuestion, setFormQuestion] = useState('');
  const [formOptionA, setFormOptionA] = useState('');
  const [formOptionB, setFormOptionB] = useState('');
  const [formOptionC, setFormOptionC] = useState('');
  const [formOptionD, setFormOptionD] = useState('');
  const [formCorrectAnswer, setFormCorrectAnswer] = useState<OptionKey>('A');
  const [formPoints, setFormPoints] = useState(10);
  const [formDifficulty, setFormDifficulty] = useState<Difficulty>('Easy');

  // Import states
  const [importJsonText, setImportJsonText] = useState('');
  const [importMode, setImportMode] = useState<'replace' | 'append'>('replace');

  // Extract unique categories from state
  const categories = useMemo(() => {
    const set = new Set<string>();
    state.questions.forEach((q: Question) => {
      if (q.category) set.add(q.category);
    });
    return Array.from(set);
  }, [state.questions]);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return state.questions.filter((q: Question) => {
      const matchSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.options.A.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.options.B.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.options.C.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.options.D.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCat = selectedCategory === 'all' || q.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;

      return matchSearch && matchCat && matchDiff;
    });
  }, [state.questions, searchTerm, selectedCategory, selectedDifficulty]);

  const openAddModal = () => {
    setFormCategory('Nigeria Current Affairs — Sep 2026');
    setFormQuestion('');
    setFormOptionA('');
    setFormOptionB('');
    setFormOptionC('');
    setFormOptionD('');
    setFormCorrectAnswer('A');
    setFormPoints(10);
    setFormDifficulty('Easy');
    setShowAddModal(true);
  };

  const openEditModal = (q: Question) => {
    setEditingQuestion(q);
    setFormCategory(q.category || 'General');
    setFormQuestion(q.question);
    setFormOptionA(q.options.A);
    setFormOptionB(q.options.B);
    setFormOptionC(q.options.C);
    setFormOptionD(q.options.D);
    setFormCorrectAnswer(q.correctAnswer);
    setFormPoints(q.points);
    setFormDifficulty(q.difficulty || 'Easy');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim() || !formOptionA.trim() || !formOptionB.trim() || !formOptionC.trim() || !formOptionD.trim()) {
      showToast('Please fill in the question and all four options.', 'warning');
      return;
    }

    const payload = {
      category: formCategory.trim() || 'General',
      question: formQuestion.trim(),
      options: {
        A: formOptionA.trim(),
        B: formOptionB.trim(),
        C: formOptionC.trim(),
        D: formOptionD.trim(),
      },
      correctAnswer: formCorrectAnswer,
      points: Number(formPoints) > 0 ? Number(formPoints) : 10,
      difficulty: formDifficulty,
    };

    if (editingQuestion) {
      updateQuestion(editingQuestion.id, payload);
      setEditingQuestion(null);
    } else {
      addQuestion(payload);
      setShowAddModal(false);
    }
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importJsonText.trim()) return;

    const validation = validateQuestionImport(importJsonText);
    if (!validation.valid || !validation.questions) {
      showToast(`Import error: ${validation.error}`, 'error');
      return;
    }

    importQuestions(validation.questions, importMode);
    setImportJsonText('');
    setShowImportModal(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setImportJsonText(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col gap-6 sm:gap-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
            <h1 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight">
              Question Bank Management
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            {state.questions.length} total questions loaded in memory. Verified for active competition use.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {state.questions.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all questions from the bank?')) {
                  clearAllQuestions();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-card hover:bg-rose-950/60 border border-surface-border text-slate-400 hover:text-rose-300 text-xs font-semibold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Bank</span>
            </button>
          )}

          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-surface-card hover:bg-surface-hover border border-surface-border text-slate-300 text-xs font-semibold transition-colors"
          >
            <Upload className="w-4 h-4 text-primary-light" />
            <span>Import Questions</span>
          </button>

          <button
            onClick={downloadQuestionTemplate}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-surface-card hover:bg-surface-hover border border-surface-border text-slate-300 text-xs font-semibold transition-colors"
          >
            <FileCode2 className="w-4 h-4 text-emerald-400" />
            <span>Template</span>
          </button>

          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>
      </div>

      {/* Categories Bar & Quick Filter Pills */}
      {state.questions.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-primary text-white shadow-md shadow-primary/30'
                : 'bg-surface-card text-slate-300 hover:bg-surface-hover border border-surface-border'
            }`}
          >
            All Categories ({state.questions.length})
          </button>

          {categories.map((cat: string) => {
            const count = state.questions.filter((q: Question) => q.category === cat).length;
            const isCurrentAffairs = cat.includes('Current Affairs');

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-gold text-slate-950 font-bold shadow-md shadow-gold/30'
                    : 'bg-surface-card text-slate-300 hover:bg-surface-hover border border-surface-border'
                }`}
              >
                <span>{cat}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${selectedCategory === cat ? 'bg-slate-900 text-gold' : 'bg-surface text-slate-400'}`}>
                  {count}
                </span>
                {isCurrentAffairs && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title={`Verified: ${CURRENT_AFFAIRS_SNAPSHOT_DATE}`} />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Search & Difficulty Filter Bar */}
      {state.questions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-3 flex items-center gap-3 p-3 bg-surface-card rounded-2xl border border-surface-border">
            <Search className="w-5 h-5 text-slate-400 ml-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions by text or answer options..."
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="p-1 text-slate-400 hover:text-white mr-1">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full h-full px-3 py-2.5 rounded-2xl bg-surface-card border border-surface-border text-xs font-semibold text-slate-200 focus:outline-none focus:border-primary"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <button
              onClick={() => {
                if (window.confirm('Reset Question Bank to the default 100 verified questions?')) {
                  resetToDefaultQuestions();
                }
              }}
              title="Reset to 100 default verified questions"
              className="p-3 rounded-2xl bg-surface-card hover:bg-surface-hover border border-surface-border text-slate-400 hover:text-gold transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Questions Card Grid */}
      {state.questions.length === 0 ? (
        <div className="text-center py-20 px-4 bg-surface-card rounded-3xl border border-surface-border">
          <div className="w-16 h-16 rounded-2xl bg-surface border border-surface-border flex items-center justify-center text-slate-500 mx-auto mb-4">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-xl text-white mb-2">Your question bank is empty.</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
            Add questions manually, import questions from a JSON file, or restore the verified 100-question bank.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={openAddModal}
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg"
            >
              Add Question
            </button>
            <button
              onClick={() => setShowImportModal(true)}
              className="px-5 py-2.5 rounded-xl bg-surface hover:bg-surface-hover border border-surface-border text-slate-300 text-xs font-semibold"
            >
              Import Questions
            </button>
            <button
              onClick={resetToDefaultQuestions}
              className="px-5 py-2.5 rounded-xl bg-gold text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-gold/20"
            >
              Restore 100 Verified Questions
            </button>
          </div>
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="text-center py-16 px-4 bg-surface-card rounded-3xl border border-surface-border">
          <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="font-display font-bold text-lg text-white mb-1">No Questions Found</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto mb-4">
            Try adjusting your search query or clear filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            className="px-4 py-2 rounded-xl bg-surface border border-surface-border text-slate-300 text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredQuestions.map((q: Question, idx: number) => {
            const isCurrentAffairs = q.category?.includes('Current Affairs');

            return (
              <div
                key={q.id}
                className="bg-surface-card rounded-2xl border border-surface-border p-5 hover:border-primary/40 transition-all shadow-lg flex flex-col gap-3"
              >
                {/* Question Header & Meta */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      #{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface border border-surface-border text-slate-300">
                      {q.category || 'General'}
                    </span>
                    {isCurrentAffairs && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold/15 text-gold border border-gold/30">
                        Snapshot: {CURRENT_AFFAIRS_SNAPSHOT_DATE}
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      q.difficulty === 'Hard' ? 'text-rose-400 bg-rose-950/40' :
                      q.difficulty === 'Medium' ? 'text-amber-400 bg-amber-950/40' :
                      'text-emerald-400 bg-emerald-950/40'
                    }`}>
                      {q.difficulty || 'Standard'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-gold/10 text-gold">
                      +{q.points} pts
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => duplicateQuestion(q.id)}
                      title="Duplicate Question"
                      className="p-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-surface-border text-slate-400 hover:text-white"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openEditModal(q)}
                      title="Edit Question"
                      className="p-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-surface-border text-slate-400 hover:text-white"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this question?')) {
                          deleteQuestion(q.id);
                        }
                      }}
                      title="Delete Question"
                      className="p-1.5 rounded-lg bg-surface hover:bg-rose-950/60 border border-surface-border text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <h3 className="font-display font-bold text-base sm:text-lg text-white leading-snug">
                  {q.question}
                </h3>

                {/* 4 Choices Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {(['A', 'B', 'C', 'D'] as OptionKey[]).map(key => {
                    const isCorrect = q.correctAnswer === key;
                    return (
                      <div
                        key={key}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border ${
                          isCorrect
                            ? 'bg-emerald-950/50 border-emerald-600/70 text-emerald-200 font-bold'
                            : 'bg-surface border-surface-border text-slate-400'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono font-bold text-[11px] ${
                          isCorrect ? 'bg-emerald-600 text-white' : 'bg-surface-card text-slate-400 border border-slate-700'
                        }`}>
                          {key}
                        </span>
                        <span className="truncate">{q.options[key]}</span>
                        {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-auto shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Question Modal */}
      {(showAddModal || editingQuestion) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface-card rounded-3xl border border-primary/40 p-5 sm:p-6 shadow-2xl my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                {editingQuestion ? 'Edit Question' : 'Add New Question to Bank'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingQuestion(null);
                }}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="py-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="e.g. Science"
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-border text-white text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value as Difficulty)}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-border text-white text-xs focus:outline-none focus:border-primary"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Points *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formPoints}
                    onChange={(e) => setFormPoints(parseInt(e.target.value) || 10)}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-border text-white text-xs font-mono focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Question Text *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="Type the competition question here..."
                  className="w-full p-3 rounded-xl bg-surface border border-surface-border text-white text-xs sm:text-sm focus:outline-none focus:border-primary"
                />
              </div>

              {/* 4 Choices */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Answer Choices (Select the correct option) *
                </label>

                {(['A', 'B', 'C', 'D'] as OptionKey[]).map(key => {
                  const val = key === 'A' ? formOptionA : key === 'B' ? formOptionB : key === 'C' ? formOptionC : formOptionD;
                  const setVal = key === 'A' ? setFormOptionA : key === 'B' ? setFormOptionB : key === 'C' ? setFormOptionC : setFormOptionD;
                  const isCorrect = formCorrectAnswer === key;

                  return (
                    <div key={key} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setFormCorrectAnswer(key)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 border transition-all ${
                          isCorrect
                            ? 'bg-emerald-600 border-emerald-400 text-white shadow-md shadow-emerald-600/30'
                            : 'bg-surface border-surface-border text-slate-400 hover:text-white'
                        }`}
                        title="Mark as correct answer"
                      >
                        {key}
                      </button>

                      <input
                        type="text"
                        required
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        placeholder={`Option ${key} text`}
                        className={`flex-1 px-3.5 py-2 rounded-xl bg-surface border text-xs sm:text-sm text-white focus:outline-none ${
                          isCorrect ? 'border-emerald-500/80 bg-emerald-950/20' : 'border-surface-border focus:border-primary'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-border">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingQuestion(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover border border-surface-border text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/30"
                >
                  {editingQuestion ? 'Save Question' : 'Add to Bank'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* JSON Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-surface-card rounded-3xl border border-primary/40 p-5 sm:p-6 shadow-2xl my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary-light" />
                <h3 className="font-display font-bold text-base sm:text-lg text-white">
                  Import Question Bank (JSON)
                </h3>
              </div>
              <button onClick={() => setShowImportModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleImportSubmit} className="py-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select File or Paste JSON
                </span>
                <label className="px-3 py-1 rounded-lg bg-surface hover:bg-surface-hover border border-surface-border text-xs text-primary-light font-semibold cursor-pointer">
                  <span>Browse .json</span>
                  <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              <textarea
                rows={8}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='[{"question": "What is...", "options": {"A": "..", "B": "..", "C": "..", "D": ".."}, "correctAnswer": "A", "points": 10}]'
                className="w-full p-3 rounded-xl bg-surface border border-surface-border text-white text-xs font-mono focus:outline-none focus:border-primary"
              />

              <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="importMode"
                    value="replace"
                    checked={importMode === 'replace'}
                    onChange={() => setImportMode('replace')}
                    className="text-primary focus:ring-0"
                  />
                  <span>Replace entire question bank</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="importMode"
                    value="append"
                    checked={importMode === 'append'}
                    onChange={() => setImportMode('append')}
                    className="text-primary focus:ring-0"
                  />
                  <span>Append to existing bank</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-border">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover border border-surface-border text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!importJsonText.trim()}
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg disabled:opacity-40"
                >
                  Import Questions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
