/**
 * Client mode alert component
 * Shows when form is shared with client
 */
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Info, Phone, Mail } from 'lucide-react';

interface ClientModeAlertProps {
  companyName: string;
  companyPhone: string;
  companyEmail: string;
}

const ClientModeAlert: React.FC<ClientModeAlertProps> = ({
  companyName,
  companyPhone,
  companyEmail
}) => {
  return (
    <Card className="border-blue-200 bg-blue-50 mb-6">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-blue-800">
              Welcome to {companyName || 'our'} investment application portal
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              Please complete all sections of this form. Your financial adviser will assist you through the process.
            </p>
            {(companyPhone || companyEmail) && (
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-blue-600">
                {companyPhone && (
                  <div className="flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span>{companyPhone}</span>
                  </div>
                )}
                {companyEmail && (
                  <div className="flex items-center space-x-1">
                    <Mail className="h-3 w-3" />
                    <span>{companyEmail}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientModeAlert;