import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [assessments, setAssessments] = useState(() => {
    const saved = localStorage.getItem('ragda-assessments');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentAssessment, setCurrentAssessment] = useState(null);

  useEffect(() => {
    localStorage.setItem('ragda-assessments', JSON.stringify(assessments));
  }, [assessments]);

  const createAssessment = (data) => {
    const newAssessment = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft',
      responses: {},
      generatedOutput: null,
      ...data,
    };
    setAssessments(prev => [newAssessment, ...prev]);
    setCurrentAssessment(newAssessment);
    return newAssessment;
  };

  const updateAssessment = (id, updates) => {
    setAssessments(prev => prev.map(a =>
      a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a
    ));
    if (currentAssessment?.id === id) {
      setCurrentAssessment(prev => ({ ...prev, ...updates, updatedAt: new Date().toISOString() }));
    }
  };

  const deleteAssessment = (id) => {
    setAssessments(prev => prev.filter(a => a.id !== id));
    if (currentAssessment?.id === id) {
      setCurrentAssessment(null);
    }
  };

  const saveResponse = (assessmentId, itemId, value) => {
    setAssessments(prev => prev.map(a => {
      if (a.id === assessmentId) {
        const newResponses = { ...a.responses, [itemId]: value };
        return { ...a, responses: newResponses, updatedAt: new Date().toISOString() };
      }
      return a;
    }));
    if (currentAssessment?.id === assessmentId) {
      setCurrentAssessment(prev => ({
        ...prev,
        responses: { ...prev.responses, [itemId]: value },
        updatedAt: new Date().toISOString(),
      }));
    }
  };

  return (
    <AppContext.Provider value={{
      assessments,
      currentAssessment,
      setCurrentAssessment,
      createAssessment,
      updateAssessment,
      deleteAssessment,
      saveResponse,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
