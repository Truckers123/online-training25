/**
 * Main offshore bond application form component
 * Handles the complete multi-step application process for offshore bond investments
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Progress } from './ui/progress';
import { AlertCircle, CheckCircle, FileText, User, CreditCard, Shield } from 'lucide-react';

/**
 * Interface for form data structure
 */
interface FormData {
  // Personal Details
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  
  // Investment Details
  investmentPlan: string;
  investmentAmount: string;
  fundingMethod: string;
  
  // Bank Details
  bankName: string;
  accountName: string;
  sortCode: string;
  accountNumber: string;
  
  // Financial Circumstances
  employmentStatus: string;
  occupation: string;
  employerName: string;
  primarySourceOfWealth: string[];
  primarySourceOfFunds: string;
  
  // Agreement
  hasReadKID: boolean;
  hasReadBrochure: boolean;
  agreesToTerms: boolean;
}

/**
 * Main offshore bond application form component
 */
export default function OffshoreApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    investmentPlan: '',
    investmentAmount: '',
    fundingMethod: '',
    bankName: '',
    accountName: '',
    sortCode: '',
    accountNumber: '',
    employmentStatus: '',
    occupation: '',
    employerName: '',
    primarySourceOfWealth: [],
    primarySourceOfFunds: '',
    hasReadKID: false,
    hasReadBrochure: false,
    agreesToTerms: false
  });

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  /**
   * Handle form field updates
   */
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Handle navigation to next step
   */
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  /**
   * Handle navigation to previous step
   */
  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Application submitted successfully!');
  };

  /**
   * Render step 1: Personal Details
   */
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <User className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Personal Details</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Select value={formData.title} onValueChange={(value) => updateFormData('title', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select title" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mr">Mr</SelectItem>
              <SelectItem value="Mrs">Mrs</SelectItem>
              <SelectItem value="Miss">Miss</SelectItem>
              <SelectItem value="Ms">Ms</SelectItem>
              <SelectItem value="Dr">Dr</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateFormData('firstName', e.target.value)}
            placeholder="Enter your first name"
          />
        </div>
        
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateFormData('lastName', e.target.value)}
            placeholder="Enter your last name"
          />
        </div>
        
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Input
            id="nationality"
            value={formData.nationality}
            onChange={(e) => updateFormData('nationality', e.target.value)}
            placeholder="Enter your nationality"
          />
        </div>
      </div>
    </div>
  );

  /**
   * Render step 2: Investment Details
   */
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <CreditCard className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Investment Details</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label>Investment Plan</Label>
          <RadioGroup value={formData.investmentPlan} onValueChange={(value) => updateFormData('investmentPlan', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="SAN016" id="SAN016" />
              <Label htmlFor="SAN016">UK Defensive Growth Deposit Plan (SAN016)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="SAN018" id="SAN018" />
              <Label htmlFor="SAN018">UK Step Down Kick-out Deposit Plan (SAN018)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="SAN017" id="SAN017" />
              <Label htmlFor="SAN017">UK Growth Deposit Plan (SAN017)</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label htmlFor="investmentAmount">Investment Amount (£)</Label>
          <Input
            id="investmentAmount"
            type="number"
            min="10000"
            value={formData.investmentAmount}
            onChange={(e) => updateFormData('investmentAmount', e.target.value)}
            placeholder="Minimum £10,000"
          />
        </div>
        
        <div>
          <Label>Funding Method</Label>
          <RadioGroup value={formData.fundingMethod} onValueChange={(value) => updateFormData('fundingMethod', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cheque" id="cheque" />
              <Label htmlFor="cheque">Cheque</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bank-transfer" id="bank-transfer" />
              <Label htmlFor="bank-transfer">Bank Transfer</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="matured-plan" id="matured-plan" />
              <Label htmlFor="matured-plan">Matured Plan Proceeds</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );

  /**
   * Render step 3: Bank Details & Financial Circumstances
   */
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Bank Details & Financial Information</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bankName">Bank Name</Label>
          <Input
            id="bankName"
            value={formData.bankName}
            onChange={(e) => updateFormData('bankName', e.target.value)}
            placeholder="Enter bank name"
          />
        </div>
        
        <div>
          <Label htmlFor="accountName">Account Name</Label>
          <Input
            id="accountName"
            value={formData.accountName}
            onChange={(e) => updateFormData('accountName', e.target.value)}
            placeholder="Enter account name"
          />
        </div>
        
        <div>
          <Label htmlFor="sortCode">Sort Code</Label>
          <Input
            id="sortCode"
            value={formData.sortCode}
            onChange={(e) => updateFormData('sortCode', e.target.value)}
            placeholder="XX-XX-XX"
          />
        </div>
        
        <div>
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input
            id="accountNumber"
            value={formData.accountNumber}
            onChange={(e) => updateFormData('accountNumber', e.target.value)}
            placeholder="Account number"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="employmentStatus">Employment Status</Label>
          <Select value={formData.employmentStatus} onValueChange={(value) => updateFormData('employmentStatus', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select employment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full time employment</SelectItem>
              <SelectItem value="part-time">Part time employment</SelectItem>
              <SelectItem value="self-employed">Self employed</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
              <SelectItem value="homemaker">Homemaker</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            value={formData.occupation}
            onChange={(e) => updateFormData('occupation', e.target.value)}
            placeholder="Enter your occupation"
          />
        </div>
        
        <div>
          <Label htmlFor="employerName">Employer Name</Label>
          <Input
            id="employerName"
            value={formData.employerName}
            onChange={(e) => updateFormData('employerName', e.target.value)}
            placeholder="Enter employer name"
          />
        </div>
      </div>
    </div>
  );

  /**
   * Render step 4: Declaration and Agreement
   */
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Declaration and Agreement</h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900">Important Information</h4>
              <p className="text-sm text-blue-800 mt-1">
                Please ensure you have read all relevant documents before proceeding with your application.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="hasReadKID"
              checked={formData.hasReadKID}
              onCheckedChange={(checked) => updateFormData('hasReadKID', checked)}
            />
            <Label htmlFor="hasReadKID" className="text-sm">
              I have received and carefully read the Key Information Document (KID)
            </Label>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox
              id="hasReadBrochure"
              checked={formData.hasReadBrochure}
              onCheckedChange={(checked) => updateFormData('hasReadBrochure', checked)}
            />
            <Label htmlFor="hasReadBrochure" className="text-sm">
              I have read the Plan brochure and understand the risks associated with the investment
            </Label>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreesToTerms"
              checked={formData.agreesToTerms}
              onCheckedChange={(checked) => updateFormData('agreesToTerms', checked)}
            />
            <Label htmlFor="agreesToTerms" className="text-sm">
              I agree to the Terms and Conditions and authorize Walker Crips Investment Management Limited to manage my investment
            </Label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Offshore Bond Application</CardTitle>
          <div className="mt-4">
            <Progress value={progressPercentage} className="w-full" />
            <p className="text-sm text-gray-600 mt-2 text-center">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={previousStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.hasReadKID || !formData.hasReadBrochure || !formData.agreesToTerms}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit Application
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

