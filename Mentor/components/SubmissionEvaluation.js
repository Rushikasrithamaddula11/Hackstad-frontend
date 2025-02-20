import React, { useState } from 'react';
import { FileText, Check, XCircle } from 'lucide-react';

const SubmissionEvaluation = ({ submission, onEvaluate }) => {
  const [feedback, setFeedback] = useState('');
  const [marks, setMarks] = useState('');

  const handleEvaluate = (status) => {
    if (!onEvaluate) {
      console.error("Error: onEvaluate function is not provided.");
      return;
    }

    const evaluationData = {
      status,
      marks: status === 'approved' ? marks : 0, // Reset marks if rejected
      feedback,
    };

    console.log("Submitting Evaluation:", evaluationData);
    onEvaluate(evaluationData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{submission.teamName}</h4>
          <p className="text-gray-600">Submitted: {submission.submissionDate}</p>
        </div>
        <div className="flex space-x-2">
          <a
            href={submission.fileUrl}
            className="flex items-center text-blue-600 hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText className="w-4 h-4 mr-1" />
            View Submission
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marks (out of 100)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows="3"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => handleEvaluate('approved')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
          >
            <Check className="w-4 h-4 mr-2" />
            Approve
          </button>
          <button
            onClick={() => handleEvaluate('rejected')}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionEvaluation;
