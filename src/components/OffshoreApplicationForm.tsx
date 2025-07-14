/**
 * Main offshore bond application form component
 * Interactive training form with all sections from the PDF
 */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AlertCircle, CheckCircle2, Eye, Download, RotateCcw } from 'lucide-react';

interface FormData {
  // Section 1: Bond Purchaser Details
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  countryOfBirth: string;
  maritalStatus: string;
  
  // Address Information
  residentialAddress: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
  residencyYears: string;
  
  // Contact Information
  homePhone: string;
  mobilePhone: string;
  emailAddress: string;
  preferredContact: string;
  
  // Identification
  identificationType: string;
  identificationNumber: string;
  identificationExpiry: string;
  
  // Tax Information
  taxResidency: string;
  tinNumber: string;
  usPerson: string;
  
  // Document Uploads
  idDocument: string;
  proofOfAddress: string;
  additionalDocuments: string[];
  
  // Section 2: Offshore Bond details
  accountNumber: string;
  bondProvider: string;
  bondReference: string;
  registeredOffice: string;
  bondPostcode: string;
  bondTelephone: string;
  
  // Section 2: Bank details
  bankName: string;
  accountName: string;
  sortCode: string;
  accountNum: string;
  bankReference: string;
  
  // Section 3: Investment selection
  selectedPlan: string;
  signingAuthority: string;
  
  // Section 4: Investment details
  totalAmount: string;
  adviserCharge: string;
  netInvestment: string;
  fundingMethod: string;
  
  // Section 5: Personal circumstances
  primaryWealth: string[];
  primaryFunds: string[];
  employmentStatus: string[];
  occupation: string;
  employer: string;
  businessNature: string;
  employmentDate: string;
  
  // Investment Profile
  initialDepositAmount: string[];
  investorExperience: string[];
  riskTolerance: string[];
  
  // Section 6: Financial advice
  firmName: string;
  adviserName: string;
  adviserChargesPaid: string;
}

interface OffshoreApplicationFormProps {
  plan1Name: string;
  plan1Code: string;
  plan2Name: string;
  plan2Code: string;
  plan3Name: string;
  plan3Code: string;
  onFormDataChange?: (data: FormData) => void;
}

const OffshoreApplicationForm: React.FC<OffshoreApplicationFormProps> = ({
  plan1Name,
  plan1Code,
  plan2Name,
  plan2Code,
  plan3Name,
  plan3Code,
  onFormDataChange
}) => {
  const [formData, setFormData] = useState<FormData>({
    // Bond Purchaser Details
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    countryOfBirth: '',
    maritalStatus: '',
    residentialAddress: '',
    city: '',
    county: '',
    postcode: '',
    country: '',
    residencyYears: '',
    homePhone: '',
    mobilePhone: '',
    emailAddress: '',
    preferredContact: '',
    identificationType: '',
    identificationNumber: '',
    identificationExpiry: '',
    taxResidency: '',
    tinNumber: '',
    usPerson: '',
    idDocument: '',
    proofOfAddress: '',
    additionalDocuments: [],
    
    // Offshore Bond Details
    accountNumber: '',
    bondProvider: '',
    bondReference: '',
    registeredOffice: '',
    bondPostcode: '',
    bondTelephone: '',
    bankName: '',
    accountName: '',
    sortCode: '',
    accountNum: '',
    bankReference: '',
    selectedPlan: '',
    signingAuthority: '',
    totalAmount: '',
    adviserCharge: '',
    netInvestment: '',
    fundingMethod: '',
    primaryWealth: [],
    primaryFunds: [],
    employmentStatus: [],
    occupation: '',
    employer: '',
    businessNature: '',
    employmentDate: '',
    initialDepositAmount: [],
    investorExperience: [],
    riskTolerance: [],
    firmName: '',
    adviserName: '',
    adviserChargesPaid: ''
  });

  const [currentTab, setCurrentTab] = useState('purchaser');
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);

  /**
   * Update form data for a specific field
   */
  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    const newData = {
      ...formData,
      [field]: value
    };
    setFormData(newData);
    onFormDataChange?.(newData);
  };

  /**
   * Handle checkbox group updates
   */
  const handleCheckboxGroup = (field: keyof FormData, value: string, checked: boolean) => {
    const currentValues = formData[field] as string[];
    if (checked) {
      updateFormData(field, [...currentValues, value]);
    } else {
      updateFormData(field, currentValues.filter(v => v !== value));
    }
  };

  /**
   * Calculate net investment amount
   */
  const calculateNetInvestment = () => {
    const total = parseFloat(formData.totalAmount) || 0;
    const charge = parseFloat(formData.adviserCharge) || 0;
    const net = total - charge;
    updateFormData('netInvestment', net.toString());
  };

  React.useEffect(() => {
    calculateNetInvestment();
  }, [formData.totalAmount, formData.adviserCharge]);

  /**
   * Check if section is completed
   */
  const isSectionCompleted = (section: string): boolean => {
    switch (section) {
      case 'purchaser':
        return formData.firstName !== '' && formData.lastName !== '' && formData.dateOfBirth !== '' && 
               formData.emailAddress !== '' && formData.residentialAddress !== '' &&
               formData.initialDepositAmount.length > 0 && formData.investorExperience.length > 0 && 
               formData.riskTolerance.length > 0;
      case 'section1':
        return formData.bondProvider !== '' && formData.bondReference !== '';
      case 'section2':
        return formData.bankName !== '' && formData.accountName !== '' && formData.sortCode !== '';
      case 'section3':
        return formData.selectedPlan !== '' && formData.signingAuthority !== '';
      case 'section4':
        return formData.totalAmount !== '' && formData.fundingMethod !== '';
      case 'section5':
        return formData.primaryWealth.length > 0 && formData.primaryFunds.length > 0 && 
               formData.employmentStatus.length > 0 && formData.occupation !== '';
      case 'section6':
        return formData.firmName !== '' && formData.adviserName !== '';
      default:
        return false;
    }
  };

  /**
   * Handle form completion
   */
  const handleComplete = () => {
    setShowCompletion(true);
  };

  /**
   * Get completion percentage
   */
  const getCompletionPercentage = (): number => {
    const sections = ['purchaser', 'section1', 'section2', 'section3', 'section4', 'section5', 'section6'];
    const completed = sections.filter(section => isSectionCompleted(section)).length;
    return Math.round((completed / sections.length) * 100);
  };

  /**
   * Check if form is fully completed
   */
  const isFormComplete = (): boolean => {
    return getCompletionPercentage() === 100;
  };

  if (showCompletion) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">
              🎉 Training Form Completed!
            </CardTitle>
            <p className="text-green-600 mt-2">
              Congratulations! You have successfully completed the offshore bond application training exercise.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-gray-800 mb-3">📊 Completion Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Form Completion:</span>
                    <span className="font-medium text-green-600">{getCompletionPercentage()}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sections Completed:</span>
                    <span className="font-medium">7/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Selected Plan:</span>
                    <span className="font-medium">{formData.selectedPlan || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investment Amount:</span>
                    <span className="font-medium">£{formData.netInvestment || '0'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-gray-800 mb-3">🎓 Learning Outcomes</h3>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Offshore bond application process</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Investment plan selection criteria</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Client data collection requirements</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Regulatory compliance procedures</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Financial adviser charge handling</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">📋 Form Data Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Applicant</h4>
                  <p className="text-gray-600">{formData.firstName && formData.lastName ? `${formData.firstName} ${formData.lastName}` : 'Not specified'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Bond Provider</h4>
                  <p className="text-gray-600">{formData.bondProvider || 'Not specified'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Bank Details</h4>
                  <p className="text-gray-600">{formData.bankName || 'Not specified'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Adviser</h4>
                  <p className="text-gray-600">{formData.adviserName || 'Not specified'}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowCompletion(false)}
                className="flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>Review Form</span>
              </Button>
              <Button
                onClick={() => window.print()}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Print/Save Certificate</span>
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowCompletion(false);
                  setCurrentTab('purchaser');
                  // Reset form if needed
                }}
                className="flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Start New Training</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6 bg-white rounded-lg border p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700">Training Progress</h3>
          <span className="text-sm text-gray-600">{getCompletionPercentage()}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionPercentage()}%` }}
          ></div>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="purchaser" className="flex items-center space-x-1">
            {isSectionCompleted('purchaser') && <CheckCircle2 className="h-4 w-4 text-green-600" />}
            <span>Purchaser</span>
          </TabsTrigger>
          <TabsTrigger value="section1" className="flex items-center space-x-1">
            {isSectionCompleted('section1') && <CheckCircle2 className="h-4 w-4 text-green-600" />}
            <span>Bond Details</span>
          </TabsTrigger>
          <TabsTrigger value="section2" className="flex items-center space-x-1">
            {isSectionCompleted('section2') && <CheckCircle2 className="h-4 w-4 text-green-600" />}
            <span>Bank Details</span>
          </TabsTrigger>
          <TabsTrigger value="section3" className="flex items-center space-x-1">
            {isSectionCompleted('section3') && <CheckCircle2 className="h-4 w-4 text-green-600" />}
            <span>Investment</span>
          </TabsTrigger>
          <TabsTrigger value="section4" className="flex items-center space-x-1">
            {isSectionCompleted('section4') && <CheckCircle2 className="h-4 w-4 text-green-600" />}
            <span>Funding</span>
          </TabsTrigger>
          <TabsTrigger value="section5" className="flex items-center space-x-1">
            {isSectionCompleted('section5') && <CheckCircle2 className="h-4 w-4 text-green-600" />}
            <span>Personal</span>
          </TabsTrigger>
          <TabsTrigger value="section6" className="flex items-center space-x-1">
            {isSectionCompleted('section6') && <CheckCircle2 className="h-4 w-4 text-green-600" />}
            <span>Adviser</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="purchaser">
          <Card>
            <CardHeader>
              <CardTitle>Bond Purchaser Details</CardTitle>
              <p className="text-sm text-gray-600">
                Please provide complete details about the person purchasing the offshore bond
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <select
                      id="title"
                      value={formData.title}
                      onChange={(e) => updateFormData('title', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                      <option value="Ms">Ms</option>
                      <option value="Dr">Dr</option>
                      <option value="Prof">Prof</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      placeholder="First name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="middleName">Middle Name(s)</Label>
                    <Input
                      id="middleName"
                      value={formData.middleName}
                      onChange={(e) => updateFormData('middleName', e.target.value)}
                      placeholder="Middle name(s)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) => updateFormData('nationality', e.target.value)}
                      placeholder="e.g., British"
                    />
                  </div>
                  <div>
                    <Label htmlFor="countryOfBirth">Country of Birth</Label>
                    <Input
                      id="countryOfBirth"
                      value={formData.countryOfBirth}
                      onChange={(e) => updateFormData('countryOfBirth', e.target.value)}
                      placeholder="Country of birth"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <select
                      id="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={(e) => updateFormData('maritalStatus', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Civil Partnership">Civil Partnership</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Residential Address</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="residentialAddress">Address *</Label>
                    <Textarea
                      id="residentialAddress"
                      value={formData.residentialAddress}
                      onChange={(e) => updateFormData('residentialAddress', e.target.value)}
                      placeholder="House number and street name"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City/Town</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => updateFormData('city', e.target.value)}
                        placeholder="City or town"
                      />
                    </div>
                    <div>
                      <Label htmlFor="county">County/State</Label>
                      <Input
                        id="county"
                        value={formData.county}
                        onChange={(e) => updateFormData('county', e.target.value)}
                        placeholder="County or state"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postcode">Postcode</Label>
                      <Input
                        id="postcode"
                        value={formData.postcode}
                        onChange={(e) => updateFormData('postcode', e.target.value)}
                        placeholder="Postcode"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => updateFormData('country', e.target.value)}
                        placeholder="Country"
                      />
                    </div>
                    <div>
                      <Label htmlFor="residencyYears">Years at this address</Label>
                      <Input
                        id="residencyYears"
                        type="number"
                        value={formData.residencyYears}
                        onChange={(e) => updateFormData('residencyYears', e.target.value)}
                        placeholder="Years"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="homePhone">Home Telephone</Label>
                    <Input
                      id="homePhone"
                      value={formData.homePhone}
                      onChange={(e) => updateFormData('homePhone', e.target.value)}
                      placeholder="Home phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobilePhone">Mobile Telephone</Label>
                    <Input
                      id="mobilePhone"
                      value={formData.mobilePhone}
                      onChange={(e) => updateFormData('mobilePhone', e.target.value)}
                      placeholder="Mobile phone number"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="emailAddress">Email Address *</Label>
                    <Input
                      id="emailAddress"
                      type="email"
                      value={formData.emailAddress}
                      onChange={(e) => updateFormData('emailAddress', e.target.value)}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                    <select
                      id="preferredContact"
                      value={formData.preferredContact}
                      onChange={(e) => updateFormData('preferredContact', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="Email">Email</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Home Phone">Home Phone</option>
                      <option value="Post">Post</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Identification */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Identification</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="identificationType">ID Type</Label>
                    <select
                      id="identificationType"
                      value={formData.identificationType}
                      onChange={(e) => updateFormData('identificationType', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="Passport">Passport</option>
                      <option value="Driving Licence">Driving Licence</option>
                      <option value="National ID">National ID Card</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="identificationNumber">ID Number</Label>
                    <Input
                      id="identificationNumber"
                      value={formData.identificationNumber}
                      onChange={(e) => updateFormData('identificationNumber', e.target.value)}
                      placeholder="Identification number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="identificationExpiry">Expiry Date</Label>
                    <Input
                      id="identificationExpiry"
                      type="date"
                      value={formData.identificationExpiry}
                      onChange={(e) => updateFormData('identificationExpiry', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Tax Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Tax Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="taxResidency">Tax Residency</Label>
                    <Input
                      id="taxResidency"
                      value={formData.taxResidency}
                      onChange={(e) => updateFormData('taxResidency', e.target.value)}
                      placeholder="Country of tax residency"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tinNumber">Tax Identification Number</Label>
                    <Input
                      id="tinNumber"
                      value={formData.tinNumber}
                      onChange={(e) => updateFormData('tinNumber', e.target.value)}
                      placeholder="TIN/UTR/SSN number"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label className="text-base font-medium">Are you a US Person?</Label>
                  <RadioGroup 
                    value={formData.usPerson} 
                    onValueChange={(value) => updateFormData('usPerson', value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="usPerson1" />
                      <Label htmlFor="usPerson1">No, I am not a US Person</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="usPerson2" />
                      <Label htmlFor="usPerson2">Yes, I am a US Person</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Investment Profile Questions */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Investment Profile</h3>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">Initial deposit amount *</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['10,000 to 50,000', '50,001 to 100,000', '100,001 to 250,000', '250,001+'].map((amount) => (
                        <div key={amount} className="flex items-center space-x-2">
                          <Checkbox
                            id={`deposit-${amount}`}
                            checked={formData.initialDepositAmount.includes(amount)}
                            onCheckedChange={(checked) => handleCheckboxGroup('initialDepositAmount', amount, checked as boolean)}
                          />
                          <Label htmlFor={`deposit-${amount}`} className="text-sm">£{amount}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Investor Experience *</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['None', 'Beginner', 'Intermediate', 'Expert'].map((experience) => (
                        <div key={experience} className="flex items-center space-x-2">
                          <Checkbox
                            id={`experience-${experience}`}
                            checked={formData.investorExperience.includes(experience)}
                            onCheckedChange={(checked) => handleCheckboxGroup('investorExperience', experience, checked as boolean)}
                          />
                          <Label htmlFor={`experience-${experience}`} className="text-sm">{experience}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Risk Tolerance *</Label>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {['Conservative', 'Moderate', 'Aggressive'].map((risk) => (
                        <div key={risk} className="flex items-center space-x-2">
                          <Checkbox
                            id={`risk-${risk}`}
                            checked={formData.riskTolerance.includes(risk)}
                            onCheckedChange={(checked) => handleCheckboxGroup('riskTolerance', risk, checked as boolean)}
                          />
                          <Label htmlFor={`risk-${risk}`} className="text-sm">{risk}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="section1">
          <Card>
            <CardHeader>
              <CardTitle>1. Offshore Bond Provider Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="accountNumber">Account Number (if existing client)</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => updateFormData('accountNumber', e.target.value)}
                  placeholder="Enter existing account number"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bondProvider">Name of Offshore Bond Provider</Label>
                  <Input
                    id="bondProvider"
                    value={formData.bondProvider}
                    onChange={(e) => updateFormData('bondProvider', e.target.value)}
                    placeholder="Provider name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bondReference">Offshore Bond Reference Number</Label>
                  <Input
                    id="bondReference"
                    value={formData.bondReference}
                    onChange={(e) => updateFormData('bondReference', e.target.value)}
                    placeholder="Reference number"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="registeredOffice">Registered Office</Label>
                <Textarea
                  id="registeredOffice"
                  value={formData.registeredOffice}
                  onChange={(e) => updateFormData('registeredOffice', e.target.value)}
                  placeholder="Full registered office address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bondPostcode">Postcode</Label>
                  <Input
                    id="bondPostcode"
                    value={formData.bondPostcode}
                    onChange={(e) => updateFormData('bondPostcode', e.target.value)}
                    placeholder="Postcode"
                  />
                </div>
                <div>
                  <Label htmlFor="bondTelephone">Telephone</Label>
                  <Input
                    id="bondTelephone"
                    value={formData.bondTelephone}
                    onChange={(e) => updateFormData('bondTelephone', e.target.value)}
                    placeholder="Telephone number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="section2">
          <Card>
            <CardHeader>
              <CardTitle>2. Bank Details</CardTitle>
              <p className="text-sm text-gray-600">
                Provide details of the bank account for payments during the investment term or following maturity
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bankName">Bank/Building Society Name</Label>
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) => updateFormData('bankName', e.target.value)}
                  placeholder="Bank name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="accountName">Account Name</Label>
                <Input
                  id="accountName"
                  value={formData.accountName}
                  onChange={(e) => updateFormData('accountName', e.target.value)}
                  placeholder="Account holder name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sortCode">Sort Code</Label>
                  <Input
                    id="sortCode"
                    value={formData.sortCode}
                    onChange={(e) => updateFormData('sortCode', e.target.value)}
                    placeholder="00-00-00"
                    pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="accountNum">Account Number</Label>
                  <Input
                    id="accountNum"
                    value={formData.accountNum}
                    onChange={(e) => updateFormData('accountNum', e.target.value)}
                    placeholder="Account number"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bankReference">Reference</Label>
                <Input
                  id="bankReference"
                  value={formData.bankReference}
                  onChange={(e) => updateFormData('bankReference', e.target.value)}
                  placeholder="Payment reference"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="section3">
          <Card>
            <CardHeader>
              <CardTitle>3. Investment Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Select Plan</Label>
                <RadioGroup 
                  value={formData.selectedPlan} 
                  onValueChange={(value) => updateFormData('selectedPlan', value)}
                  className="mt-2"
                >
                  {plan1Name && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={plan1Code} id="plan1" />
                      <Label htmlFor="plan1">{plan1Name} ({plan1Code})</Label>
                    </div>
                  )}
                  {plan2Name && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={plan2Code} id="plan2" />
                      <Label htmlFor="plan2">{plan2Name} ({plan2Code})</Label>
                    </div>
                  )}
                  {plan3Name && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={plan3Code} id="plan3" />
                      <Label htmlFor="plan3">{plan3Name} ({plan3Code})</Label>
                    </div>
                  )}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-medium">Signing Authority</Label>
                <RadioGroup 
                  value={formData.signingAuthority} 
                  onValueChange={(value) => updateFormData('signingAuthority', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any-one" id="auth1" />
                    <Label htmlFor="auth1">Any one</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any-two" id="auth2" />
                    <Label htmlFor="auth2">Any two</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="auth3" />
                    <Label htmlFor="auth3">Other (please specify)</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="section4">
          <Card>
            <CardHeader>
              <CardTitle>4. Investment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Funding Method</Label>
                <RadioGroup 
                  value={formData.fundingMethod} 
                  onValueChange={(value) => updateFormData('fundingMethod', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cheque" id="fund1" />
                    <Label htmlFor="fund1">Cheque attached</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="transfer" id="fund2" />
                    <Label htmlFor="fund2">Bank transfer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="matured" id="fund3" />
                    <Label htmlFor="fund3">Proceeds from matured plan</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="totalAmount">Total Amount Being Sent (£)</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    value={formData.totalAmount}
                    onChange={(e) => updateFormData('totalAmount', e.target.value)}
                    placeholder="0.00"
                    min="10000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="adviserCharge">Adviser Charge Deducted (£)</Label>
                  <Input
                    id="adviserCharge"
                    type="number"
                    value={formData.adviserCharge}
                    onChange={(e) => updateFormData('adviserCharge', e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="netInvestment">Net Investment Amount (£)</Label>
                  <Input
                    id="netInvestment"
                    type="number"
                    value={formData.netInvestment}
                    readOnly
                    className="bg-gray-50"
                    placeholder="Auto-calculated"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum £10,000</p>
                </div>
              </div>

              {parseFloat(formData.netInvestment) < 10000 && formData.netInvestment !== '' && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>Net investment must be at least £10,000</span>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="section5">
          <Card>
            <CardHeader>
              <CardTitle>5. Personal Financial Circumstances</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Primary Source of Wealth (tick all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {['Employment', 'Investment', 'Savings', 'Business ownership/sale', 'Property ownership/sale', 'Pension', 'Inheritance', 'Family trust', 'Other'].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={`wealth-${item}`}
                        checked={formData.primaryWealth.includes(item)}
                        onCheckedChange={(checked) => handleCheckboxGroup('primaryWealth', item, checked as boolean)}
                      />
                      <Label htmlFor={`wealth-${item}`} className="text-sm">{item}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Primary Source of Funds (tick all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {['UK bank', 'UK investment firm', 'Transfer from unregulated firm', 'Overseas bank', 'Overseas investment firm', 'Internal transfer from existing account', 'Other'].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={`funds-${item}`}
                        checked={formData.primaryFunds.includes(item)}
                        onCheckedChange={(checked) => handleCheckboxGroup('primaryFunds', item, checked as boolean)}
                      />
                      <Label htmlFor={`funds-${item}`} className="text-sm">{item}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Employment Status (tick all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {['Full time employment', 'Part time employment', 'Self employed', 'Unemployed', 'Homemaker', 'Retired', 'Other'].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={`employment-${item}`}
                        checked={formData.employmentStatus.includes(item)}
                        onCheckedChange={(checked) => handleCheckboxGroup('employmentStatus', item, checked as boolean)}
                      />
                      <Label htmlFor={`employment-${item}`} className="text-sm">{item}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="occupation">Occupation/Job Title</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => updateFormData('occupation', e.target.value)}
                    placeholder="Current or previous occupation"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="employer">Employer's Name</Label>
                  <Input
                    id="employer"
                    value={formData.employer}
                    onChange={(e) => updateFormData('employer', e.target.value)}
                    placeholder="Company name (if applicable)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessNature">Nature of Business</Label>
                  <Input
                    id="businessNature"
                    value={formData.businessNature}
                    onChange={(e) => updateFormData('businessNature', e.target.value)}
                    placeholder="Type of business"
                  />
                </div>
                <div>
                  <Label htmlFor="employmentDate">Date of Joining Current Employment</Label>
                  <Input
                    id="employmentDate"
                    type="date"
                    value={formData.employmentDate}
                    onChange={(e) => updateFormData('employmentDate', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="section6">
          <Card>
            <CardHeader>
              <CardTitle>6. Financial Advice and Adviser Charging</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firmName">Firm Name</Label>
                  <Input
                    id="firmName"
                    value={formData.firmName}
                    onChange={(e) => updateFormData('firmName', e.target.value)}
                    placeholder="Financial advisory firm"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="adviserName">Adviser Name</Label>
                  <Input
                    id="adviserName"
                    value={formData.adviserName}
                    onChange={(e) => updateFormData('adviserName', e.target.value)}
                    placeholder="Individual adviser name"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Have you paid the adviser charges?</Label>
                <RadioGroup 
                  value={formData.adviserChargesPaid} 
                  onValueChange={(value) => updateFormData('adviserChargesPaid', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="charges1" />
                    <Label htmlFor="charges1">Yes, I/we have paid the adviser charges separately</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="charges2" />
                    <Label htmlFor="charges2">No, please deduct and pay adviser (max 4% of investment)</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => {
            const sections = ['purchaser', 'section1', 'section2', 'section3', 'section4', 'section5', 'section6'];
            const currentIndex = sections.indexOf(currentTab);
            if (currentIndex > 0) {
              setCurrentTab(sections[currentIndex - 1]);
            }
          }}
          disabled={currentTab === 'purchaser'}
        >
          Previous
        </Button>
        
        {currentTab === 'section6' ? (
          <Button 
            onClick={handleComplete}
            disabled={!isFormComplete()}
            className="bg-green-600 hover:bg-green-700"
          >
            {isFormComplete() ? 'Complete Training' : 'Complete All Sections First'}
          </Button>
        ) : (
          <Button 
            onClick={() => {
              const sections = ['purchaser', 'section1', 'section2', 'section3', 'section4', 'section5', 'section6'];
              const currentIndex = sections.indexOf(currentTab);
              if (currentIndex < sections.length - 1) {
                setCurrentTab(sections[currentIndex + 1]);
              }
            }}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default OffshoreApplicationForm;