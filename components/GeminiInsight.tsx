import React, { useState, useCallback } from 'react';
import { analyzeDataWithGemini } from '../services/geminiService';
import { SparklesIcon, LoadingSpinnerIcon } from './icons/GeminiIcons';

interface GeminiInsightProps {
  data: any;
}

const defaultQuestions = [
    "What are the key trends in my profit over the last year?",
    "Which of my product categories is performing the best?",
    "Identify any months with unusual spending or revenue for me.",
];

export const GeminiInsight: React.FC<GeminiInsightProps> = ({ data }) => {
  const [question, setQuestion] = useState<string>('Summarize my overall business performance.');
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getInsight = useCallback(async () => {
    if (!question) return;
    setLoading(true);
    setInsight('');
    try {
      const result = await analyzeDataWithGemini(data, question);
      setInsight(result);
    } catch (error) {
      console.error("Failed to get insight from Gemini:", error);
      setInsight('An error occurred while fetching insights.');
    } finally {
      setLoading(false);
    }
  }, [data, question]);

  const handleQuestionSelect = (q: string) => {
    setQuestion(q);
    // Automatically trigger analysis for preset questions
    getInsight();
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <SparklesIcon />
        <h3 className="text-lg font-medium text-white ml-2">Tony's AI Analyst</h3>
      </div>
      
      <div className="flex-grow flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3 flex flex-col">
            <label htmlFor="question-input" className="text-sm font-medium text-slate-300 mb-2">Ask a question about my data:</label>
            <textarea
              id="question-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-grow w-full p-2 bg-slate-700/50 border border-slate-600 rounded-md text-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
              placeholder="e.g., What was my most profitable quarter?"
              rows={3}
            />
            <button
                onClick={getInsight}
                disabled={loading || !question}
                className="mt-2 w-full flex items-center justify-center px-4 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-500 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
            >
                {loading ? <LoadingSpinnerIcon /> : 'Get Insight'}
            </button>
            <div className="mt-4">
                <p className="text-sm text-slate-400 mb-2">Or try one of these:</p>
                <div className="flex flex-col space-y-2">
                    {defaultQuestions.map(q => (
                        <button key={q} onClick={() => handleQuestionSelect(q)} className="text-left text-sm text-sky-400 hover:text-sky-300 transition">
                            {q}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div className="w-full md:w-2/3">
          <div className="h-full bg-slate-900/50 rounded-lg p-4 overflow-y-auto prose prose-invert prose-sm max-w-none prose-p:text-slate-300 prose-li:text-slate-300">
            {loading && (
              <div className="flex items-center justify-center h-full">
                <LoadingSpinnerIcon />
                <span className="ml-2">Analyzing data...</span>
              </div>
            )}
            {!loading && !insight && (
              <div className="flex items-center justify-center h-full text-slate-400">
                My AI-powered insights will appear here.
              </div>
            )}
            {insight.split('\n').map((line, index) => {
              if (line.trim().startsWith('* ')) {
                return <li key={index} className="ml-4">{line.substring(2)}</li>;
              }
              return <p key={index}>{line}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};