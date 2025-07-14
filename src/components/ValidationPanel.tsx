/**
 * Advanced validation panel for form compliance checking
 * Provides real-time validation feedback and regulatory compliance
 */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';

interface ValidationRule {
  id: string;
  category: string;
  rule: string;
  status: 'pass' | 'fail' | 'warning' | 'info';
  message: string;
  required: boolean;
}

interface ValidationPanelProps {
  formData: any;
  brandData: any;
}

const ValidationPanel: React.FC<ValidationPanelProps> = ({
  formData,
  brandData
}) => {
  /**
   * Run validation checks on current form data
   */
  const runValidations = (): ValidationRule[] => {
    const rules: ValidationRule[] = [];

    // Brand Data Validations
    rules.push({
      id: 'company-name',
      category: 'Branding',
      rule: 'Company Name Required',
      status: brandData.companyName ? 'pass' : 'fail',
      message: brandData.companyName ? 'Company name provided' : 'Company name is required for professional forms',
      required: true
    });

    rules.push({
      id: 'contact-info',
      category: 'Branding',
      rule: 'Contact Information',
      status: (brandData.companyPhone && brandData.companyEmail) ? 'pass' : 'warning',
      message: (brandData.companyPhone && brandData.companyEmail) ? 'Complete contact information' : 'Phone and email recommended for client contact',
      required: false
    });

    // Investment Plan Validations
    const planCount = [brandData.plan1Name, brandData.plan2Name, brandData.plan3Name].filter(p => p).length;
    rules.push({
      id: 'investment-plans',
      category: 'Investment Plans',
      rule: 'Minimum Investment Options',
      status: planCount >= 2 ? 'pass' : 'warning',
      message: planCount >= 2 ? `${planCount} investment plans configured` : 'At least 2 investment plans recommended',
      required: false
    });

    rules.push({
      id: 'plan-codes',
      category: 'Investment Plans',
      rule: 'Plan Reference Codes',
      status: (brandData.plan1Code && brandData.plan2Code) ? 'pass' : 'fail',
      message: (brandData.plan1Code && brandData.plan2Code) ? 'Plan codes provided' : 'Plan reference codes required for compliance',
      required: true
    });

    // Form Data Validations
    if (formData) {
      rules.push({
        id: 'net-investment',
        category: 'Investment Details',
        rule: 'Minimum Investment Amount',
        status: parseFloat(formData.netInvestment || '0') >= 10000 ? 'pass' : 'fail',
        message: parseFloat(formData.netInvestment || '0') >= 10000 ? 'Meets minimum investment requirement' : 'Net investment must be at least £10,000',
        required: true
      });

      rules.push({
        id: 'bank-details',
        category: 'Banking',
        rule: 'Bank Account Details',
        status: (formData.bankName && formData.sortCode && formData.accountNum) ? 'pass' : 'fail',
        message: (formData.bankName && formData.sortCode && formData.accountNum) ? 'Complete bank details provided' : 'Bank details required for payments',
        required: true
      });

      rules.push({
        id: 'aml-compliance',
        category: 'Compliance',
        rule: 'AML Information',
        status: (formData.primaryWealth?.length > 0 && formData.occupation) ? 'pass' : 'warning',
        message: (formData.primaryWealth?.length > 0 && formData.occupation) ? 'AML information complete' : 'Source of wealth and occupation required for AML compliance',
        required: true
      });

      rules.push({
        id: 'adviser-details',
        category: 'Regulatory',
        rule: 'Financial Adviser Information',
        status: (formData.firmName && formData.adviserName) ? 'pass' : 'warning',
        message: (formData.firmName && formData.adviserName) ? 'Adviser details complete' : 'Adviser information required for regulatory compliance',
        required: true
      });
    }

    // Regulatory Compliance Checks
    rules.push({
      id: 'closing-date',
      category: 'Regulatory',
      rule: 'Application Deadline',
      status: brandData.closingDate ? 'pass' : 'info',
      message: brandData.closingDate ? 'Application deadline specified' : 'Consider adding application deadline for client clarity',
      required: false
    });

    return rules;
  };

  const validationResults = runValidations();
  const passCount = validationResults.filter(r => r.status === 'pass').length;
  const failCount = validationResults.filter(r => r.status === 'fail').length;
  const warningCount = validationResults.filter(r => r.status === 'warning').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'fail':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'fail':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'info':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const categories = [...new Set(validationResults.map(r => r.category))];

  return (
    <Card className="mb-6 border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="text-orange-800 flex items-center justify-between">
          <span>Validation & Compliance</span>
          <div className="flex space-x-2">
            <Badge variant="outline" className="text-green-700 border-green-300">
              ✓ {passCount}
            </Badge>
            {warningCount > 0 && (
              <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                ⚠ {warningCount}
              </Badge>
            )}
            {failCount > 0 && (
              <Badge variant="outline" className="text-red-700 border-red-300">
                ✗ {failCount}
              </Badge>
            )}
          </div>
        </CardTitle>
        <p className="text-sm text-orange-600">
          Real-time validation and regulatory compliance checking
        </p>
      </CardHeader>
      <CardContent>
        {categories.map(category => {
          const categoryRules = validationResults.filter(r => r.category === category);
          return (
            <div key={category} className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
              <div className="space-y-2">
                {categoryRules.map(rule => (
                  <div
                    key={rule.id}
                    className={`p-3 rounded-lg border ${getStatusColor(rule.status)}`}
                  >
                    <div className="flex items-start space-x-2">
                      {getStatusIcon(rule.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{rule.rule}</p>
                          {rule.required && (
                            <Badge variant="outline" className="text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs mt-1 opacity-90">{rule.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-6 pt-4 border-t border-orange-200">
          <div className="text-sm text-orange-700">
            <p className="font-medium mb-2">Compliance Summary:</p>
            <ul className="space-y-1 text-xs">
              <li>• All required fields must be completed for regulatory compliance</li>
              <li>• AML (Anti-Money Laundering) information is mandatory</li>
              <li>• Minimum investment amounts apply to all plans</li>
              <li>• Financial adviser details required for advised sales</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValidationPanel;