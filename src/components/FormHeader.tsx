/**
 * Header component for the offshore bond application form
 * Displays the Walker Crips branding and application title
 */

import React from 'react';
import { FileText, Building2 } from 'lucide-react';

/**
 * FormHeader component that displays the application title and branding
 */
export default function FormHeader() {
  return (
    <div className="bg-white border-b shadow-sm mb-8">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Walker Crips Structured Investments</h1>
              <p className="text-sm text-gray-600">Offshore Bond Application</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FileText className="w-4 h-4" />
            <span>Application Form</span>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h2 className="font-semibold text-blue-900 mb-2">Available Investment Plans:</h2>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• UK Defensive Growth Deposit Plan (SAN016)</li>
            <li>• UK Step Down Kick-out Deposit Plan (SAN018)</li>
            <li>• UK Growth Deposit Plan (SAN017)</li>
          </ul>
          <p className="text-sm text-blue-700 mt-2">
            <strong>Closing date for applications:</strong> 5 July 2024
          </p>
        </div>
      </div>
    </div>
  );
}
