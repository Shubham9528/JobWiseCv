import { useState, useCallback } from 'react';
import { resumeService } from '../services/api.service';

export const useResume = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [resume, setResume] = useState('');
  const [interviewQuestions, setInterviewQuestions] = useState('');

  const processJobDescription = useCallback(async (description) => {
    setLoading(true);
    setError(null);
    try {
      const result = await resumeService.processJobDescription(description);
      setKeywords(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateResume = useCallback(async (resumeText) => {
    setLoading(true);
    setError(null);
    try {
      const result = await resumeService.generateResume(resumeText);
      setResume(result.data);
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const enhanceResume = useCallback(async (currentResume) => {
    setLoading(true);
    setError(null);
    try {
      const result = await resumeService.enhanceResume(currentResume);
      setResume(result.data);
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateInterviewQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await resumeService.generateInterviewQuestions();
      setInterviewQuestions(result.data);
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    keywords,
    resume,
    interviewQuestions,
    processJobDescription,
    generateResume,
    enhanceResume,
    generateInterviewQuestions,
  };
};
