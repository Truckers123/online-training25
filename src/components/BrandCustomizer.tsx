/**
 * Brand customization component for training tool
 * Allows students to add their own company branding
 */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Upload, X } from 'lucide-react';

interface BrandCustomizerProps {
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
  onUpdate: (field: string, value: string) => void;
}

const BrandCustomizer: React.FC<BrandCustomizerProps> = ({
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
  closingDate,
  onUpdate
}) => {
  /**
   * Handle logo file upload
   */
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpdate('logoUrl', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Remove uploaded logo
   */
  const removeLogo = () => {
    onUpdate('logoUrl', '');
  };

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-blue-800">Customize Your Brand</CardTitle>
        <p className="text-sm text-blue-600">
          Add your company details to personalize this training form
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => onUpdate('companyName', e.target.value)}
              placeholder="Enter your company name"
            />
          </div>
          <div>
            <Label htmlFor="companyWebsite">Website</Label>
            <Input
              id="companyWebsite"
              value={companyWebsite}
              onChange={(e) => onUpdate('companyWebsite', e.target.value)}
              placeholder="www.yourcompany.com"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="companyAddress">Address</Label>
          <Input
            id="companyAddress"
            value={companyAddress}
            onChange={(e) => onUpdate('companyAddress', e.target.value)}
            placeholder="Full business address"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyPhone">Phone</Label>
            <Input
              id="companyPhone"
              value={companyPhone}
              onChange={(e) => onUpdate('companyPhone', e.target.value)}
              placeholder="Phone number"
            />
          </div>
          <div>
            <Label htmlFor="companyEmail">Email</Label>
            <Input
              id="companyEmail"
              value={companyEmail}
              onChange={(e) => onUpdate('companyEmail', e.target.value)}
              placeholder="contact@yourcompany.com"
            />
          </div>
        </div>

        <div>
          <Label>Company Logo</Label>
          <div className="mt-2">
            {logoUrl ? (
              <div className="flex items-center space-x-4">
                <img src={logoUrl} alt="Company Logo" className="h-16 w-auto object-contain border rounded" />
                <Button variant="outline" size="sm" onClick={removeLogo} className="text-red-600">
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <Label htmlFor="logo-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload logo</p>
                </Label>
              </div>
            )}
          </div>
        </div>

        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-medium text-blue-800 mb-4">Form & Investment Customization</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="formTitle">Form Title</Label>
              <Input
                id="formTitle"
                value={formTitle}
                onChange={(e) => onUpdate('formTitle', e.target.value)}
                placeholder="e.g., Application form for Offshore Bond investment"
              />
              <p className="text-xs text-gray-500 mt-1">
                Examples: "Structured Product Application", "Investment Bond Form", "Savings Plan Application"
              </p>
            </div>

            <div>
              <Label htmlFor="closingDate">Application Closing Date</Label>
              <Input
                id="closingDate"
                value={closingDate}
                onChange={(e) => onUpdate('closingDate', e.target.value)}
                placeholder="e.g., 5 July 2024"
              />
              <p className="text-xs text-gray-500 mt-1">
                Examples: "31 December 2024", "No deadline", "Rolling applications accepted", "Contact for details"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plan1Name">Plan 1 Name</Label>
                <Input
                  id="plan1Name"
                  value={plan1Name}
                  onChange={(e) => onUpdate('plan1Name', e.target.value)}
                  placeholder="Enter plan name"
                />
              </div>
              <div>
                <Label htmlFor="plan1Code">Plan 1 Code</Label>
                <Input
                  id="plan1Code"
                  value={plan1Code}
                  onChange={(e) => onUpdate('plan1Code', e.target.value)}
                  placeholder="e.g., SAN016"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plan2Name">Plan 2 Name</Label>
                <Input
                  id="plan2Name"
                  value={plan2Name}
                  onChange={(e) => onUpdate('plan2Name', e.target.value)}
                  placeholder="Enter plan name"
                />
              </div>
              <div>
                <Label htmlFor="plan2Code">Plan 2 Code</Label>
                <Input
                  id="plan2Code"
                  value={plan2Code}
                  onChange={(e) => onUpdate('plan2Code', e.target.value)}
                  placeholder="e.g., SAN018"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plan3Name">Plan 3 Name</Label>
                <Input
                  id="plan3Name"
                  value={plan3Name}
                  onChange={(e) => onUpdate('plan3Name', e.target.value)}
                  placeholder="Enter plan name"
                />
              </div>
              <div>
                <Label htmlFor="plan3Code">Plan 3 Code</Label>
                <Input
                  id="plan3Code"
                  value={plan3Code}
                  onChange={(e) => onUpdate('plan3Code', e.target.value)}
                  placeholder="e.g., SAN017"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandCustomizer;