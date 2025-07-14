/**
 * Main application page for the Offshore Bond training tool
 * Combines brand customization with interactive form
 */
import React, { useState } from 'react';
import BrandCustomizer from '../components/BrandCustomizer';
import FormHeader from '../components/FormHeader';
import OffshoreApplicationForm from '../components/OffshoreApplicationForm';
import TemplateLibrary from '../components/TemplateLibrary';
import ValidationPanel from '../components/ValidationPanel';
import ClientModeAlert from '../components/ClientModeAlert';
import { Button } from '../components/ui/button';
import { Eye, EyeOff, Download, RotateCcw, Library, Shield, FileDown, Share2 } from 'lucide-react';
import { saveAs } from 'file-saver';

export default function Home() {
  const [showCustomizer, setShowCustomizer] = useState(true);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [professionalMode, setProfessionalMode] = useState(false);
  const [clientMode, setClientMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [brandData, setBrandData] = useState({
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
    companyWebsite: '',
    logoUrl: '',
    formTitle: 'Application form for Offshore Bond investment',
    plan1Name: 'UK Defensive Growth Deposit Plan',
    plan1Code: 'SAN016',
    plan2Name: 'UK Step Down Kick-out Deposit Plan', 
    plan2Code: 'SAN018',
    plan3Name: 'UK Growth Deposit Plan',
    plan3Code: 'SAN017',
    closingDate: '5 July 2024'
  });

  /**
   * Update brand data for a specific field
   */
  const updateBrandData = (field: string, value: string) => {
    setBrandData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Load template data
   */
  const loadTemplate = (templateData: any) => {
    setBrandData(templateData);
  };

  /**
   * Reset all brand data to defaults
   */
  const resetBrandData = () => {
    setBrandData({
      companyName: '',
      companyAddress: '',
      companyPhone: '',
      companyEmail: '',
      companyWebsite: '',
      logoUrl: '',
      formTitle: 'Application form for Offshore Bond investment',
      plan1Name: 'UK Defensive Growth Deposit Plan',
      plan1Code: 'SAN016',
      plan2Name: 'UK Step Down Kick-out Deposit Plan', 
      plan2Code: 'SAN018',
      plan3Name: 'UK Growth Deposit Plan',
      plan3Code: 'SAN017',
      closingDate: '5 July 2024'
    });
  };

  /**
   * Print the form
   */
  const handlePrint = () => {
    window.print();
  };

  /**
   * Export form data as JSON
   */
  const exportJSON = () => {
    const exportData = {
      brandData,
      formData,
      exportDate: new Date().toISOString(),
      exportType: 'training-form-data'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    saveAs(dataBlob, `offshore-bond-application-${new Date().toISOString().split('T')[0]}.json`);
  };

  /**
   * Export form as PDF
   */
  const exportPDF = async () => {
    // For now, use print dialog - can be enhanced with jsPDF later
    window.print();
  };

  /**
   * Generate client sharing URL
   */
  const generateClientURL = () => {
    const clientData = {
      brandData,
      clientMode: true,
      timestamp: Date.now()
    };
    const encodedData = btoa(JSON.stringify(clientData));
    const clientURL = `${window.location.origin}${window.location.pathname}#client=${encodedData}`;
    
    navigator.clipboard.writeText(clientURL).then(() => {
      alert('Client form URL copied to clipboard!');
    });
  };

  return (
    <div className={`min-h-screen ${professionalMode ? 'bg-white' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${professionalMode ? 'hidden' : 'bg-white shadow-sm border-b'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Offshore Bond Application - Training Tool
              </h1>
              <p className="text-gray-600 mt-1">
                Interactive training form with customizable branding
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCustomizer(!showCustomizer)}
                className="flex items-center space-x-1"
              >
                {showCustomizer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>{showCustomizer ? 'Hide' : 'Show'} Customizer</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTemplateLibrary(!showTemplateLibrary)}
                className="flex items-center space-x-1"
              >
                <Library className="h-4 w-4" />
                <span>Templates</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowValidation(!showValidation)}
                className="flex items-center space-x-1"
              >
                <Shield className="h-4 w-4" />
                <span>Validation</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetBrandData}
                className="flex items-center space-x-1"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handlePrint}
                className="flex items-center space-x-1"
              >
                <Download className="h-4 w-4" />
                <span>Print PDF</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportJSON}
                className="flex items-center space-x-1"
              >
                <FileDown className="h-4 w-4" />
                <span>Export Data</span>
              </Button>
              <Button
                variant={professionalMode ? "default" : "outline"}
                size="sm"
                onClick={() => setProfessionalMode(!professionalMode)}
                className="flex items-center space-x-1"
              >
                <Share2 className="h-4 w-4" />
                <span>{professionalMode ? 'Training' : 'Professional'} Mode</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Professional Mode Header */}
      {professionalMode && (
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {brandData.companyName || 'Professional Financial Services'}
                </h1>
                <p className="text-gray-600 mt-1">
                  Offshore Bond Investment Application
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateClientURL}
                  className="flex items-center space-x-1"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share with Client</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setProfessionalMode(false)}
                  className="flex items-center space-x-1"
                >
                  <Eye className="h-4 w-4" />
                  <span>Exit Professional Mode</span>
                </Button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${professionalMode ? 'py-4' : 'py-8'}`}>
        {/* Template Library */}
        {showTemplateLibrary && !professionalMode && (
          <TemplateLibrary
            onLoadTemplate={loadTemplate}
            currentData={brandData}
          />
        )}

        {/* Validation Panel */}
        {showValidation && !professionalMode && (
          <ValidationPanel
            formData={formData}
            brandData={brandData}
          />
        )}

        {/* Brand Customizer */}
        {showCustomizer && !professionalMode && (
          <BrandCustomizer
            companyName={brandData.companyName}
            companyAddress={brandData.companyAddress}
            companyPhone={brandData.companyPhone}
            companyEmail={brandData.companyEmail}
            companyWebsite={brandData.companyWebsite}
            logoUrl={brandData.logoUrl}
            formTitle={brandData.formTitle}
            plan1Name={brandData.plan1Name}
            plan1Code={brandData.plan1Code}
            plan2Name={brandData.plan2Name}
            plan2Code={brandData.plan2Code}
            plan3Name={brandData.plan3Name}
            plan3Code={brandData.plan3Code}
            closingDate={brandData.closingDate}
            onUpdate={updateBrandData}
          />
        )}

        {/* Client Mode Alert */}
        {professionalMode && (
          <ClientModeAlert
            companyName={brandData.companyName}
            companyPhone={brandData.companyPhone}
            companyEmail={brandData.companyEmail}
          />
        )}

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <FormHeader
            companyName={brandData.companyName}
            companyAddress={brandData.companyAddress}
            companyPhone={brandData.companyPhone}
            companyEmail={brandData.companyEmail}
            companyWebsite={brandData.companyWebsite}
            logoUrl={brandData.logoUrl}
            formTitle={brandData.formTitle}
            plan1Name={brandData.plan1Name}
            plan1Code={brandData.plan1Code}
            plan2Name={brandData.plan2Name}
            plan2Code={brandData.plan2Code}
            plan3Name={brandData.plan3Name}
            plan3Code={brandData.plan3Code}
            closingDate={brandData.closingDate}
          />
          
          <div className="p-6">
            <OffshoreApplicationForm 
              plan1Name={brandData.plan1Name}
              plan1Code={brandData.plan1Code}
              plan2Name={brandData.plan2Name}
              plan2Code={brandData.plan2Code}
              plan3Name={brandData.plan3Name}
              plan3Code={brandData.plan3Code}
              onFormDataChange={setFormData}
            />
          </div>
        </div>

        {/* Training Instructions */}
        {!professionalMode && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Training Instructions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h4 className="font-medium mb-2">How to Use This Tool:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Use the brand customizer to add your company details</li>
                  <li>Upload your logo to see it in the form header</li>
                  <li>Complete each section of the form using the tabs</li>
                  <li>Green checkmarks show completed sections</li>
                  <li>Use Print/Save to export the completed form</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Learning Objectives:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Understand offshore bond application processes</li>
                  <li>Practice form completion and validation</li>
                  <li>Learn regulatory compliance requirements</li>
                  <li>Experience professional form presentation</li>
                  <li>Practice client data collection methods</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
