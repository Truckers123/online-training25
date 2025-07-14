/**
 * Customizable form header component
 * Displays company branding and form title
 */
import React from 'react';

interface FormHeaderProps {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyWebsite: string;
  logoUrl: string;
  formTitle: string;
  plan1Name: string;
  plan1Code: string;
  plan2Name: string;
  plan2Code: string;
  plan3Name: string;
  plan3Code: string;
  closingDate: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({
  companyName,
  companyAddress,
  companyPhone,
  companyEmail,
  companyWebsite,
  logoUrl,
  formTitle,
  plan1Name,
  plan1Code,
  plan2Name,
  plan2Code,
  plan3Name,
  plan3Code,
  closingDate
}) => {
  return (
    <div className="bg-white border-b-2 border-gray-200 p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-6">
          {logoUrl && (
            <img 
              src={logoUrl} 
              alt="Company Logo" 
              className="h-16 w-auto object-contain"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {companyName || 'Your Company Name'}
            </h1>
            {companyAddress && (
              <p className="text-sm text-gray-600 mt-1">{companyAddress}</p>
            )}
            <div className="flex space-x-4 mt-2 text-sm text-gray-600">
              {companyPhone && <span>Tel: {companyPhone}</span>}
              {companyEmail && <span>Email: {companyEmail}</span>}
            </div>
            {companyWebsite && (
              <p className="text-sm text-blue-600 mt-1">{companyWebsite}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {formTitle || 'Application form for Offshore Bond investment'}
        </h2>
        <p className="text-gray-600 mt-2">
          This application form is for investment into the following plans:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
          {plan1Name && <li>{plan1Name} ({plan1Code})</li>}
          {plan2Name && <li>{plan2Name} ({plan2Code})</li>}
          {plan3Name && <li>{plan3Name} ({plan3Code})</li>}
        </ul>
        {closingDate && (
          <div className="mt-3">
            {closingDate.toLowerCase().includes('no deadline') || closingDate.toLowerCase().includes('rolling') ? (
              <p className="text-sm text-green-600 font-medium">
                {closingDate}
              </p>
            ) : closingDate.toLowerCase().includes('contact') ? (
              <p className="text-sm text-blue-600 font-medium">
                {closingDate}
              </p>
            ) : (
              <p className="text-sm text-red-600 font-medium">
                The closing date for applications is {closingDate}.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormHeader;