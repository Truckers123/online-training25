/**
 * Template library component for saving and loading training configurations
 * Allows trainers to create and share pre-built scenarios
 */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Save, Download, Upload, Trash2, Eye } from 'lucide-react';
import { saveAs } from 'file-saver';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  data: any;
  createdAt: string;
}

interface TemplateLibraryProps {
  onLoadTemplate: (data: any) => void;
  currentData: any;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({
  onLoadTemplate,
  currentData
}) => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Offshore Bond Training',
      description: 'Standard offshore bond application with UK defensive growth plans',
      category: 'Investment Bonds',
      data: {
        companyName: 'Training Financial Services',
        companyAddress: '123 Training Street, London, UK',
        companyPhone: '+44 20 1234 5678',
        companyEmail: 'training@example.com',
        companyWebsite: 'www.trainingfinancial.com',
        logoUrl: '',
        formTitle: 'Application form for Offshore Bond investment',
        plan1Name: 'UK Defensive Growth Deposit Plan',
        plan1Code: 'SAN016',
        plan2Name: 'UK Step Down Kick-out Deposit Plan',
        plan2Code: 'SAN018',
        plan3Name: 'UK Growth Deposit Plan',
        plan3Code: 'SAN017',
        closingDate: '5 July 2024'
      },
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Structured Products',
      description: 'Structured product applications with capital protection features',
      category: 'Structured Products',
      data: {
        companyName: 'Capital Solutions Ltd',
        companyAddress: '456 Investment Avenue, Edinburgh, UK',
        companyPhone: '+44 131 987 6543',
        companyEmail: 'products@capitalsolutions.co.uk',
        companyWebsite: 'www.capitalsolutions.co.uk',
        logoUrl: '',
        formTitle: 'Structured Product Investment Application',
        plan1Name: 'FTSE 100 Capital Protected Plan',
        plan1Code: 'CP001',
        plan2Name: 'European Growth Barrier Plan',
        plan2Code: 'EGB002',
        plan3Name: 'Global Equity Autocall Plan',
        plan3Code: 'GEA003',
        closingDate: '15 August 2024'
      },
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      name: 'ISA Investment',
      description: 'Individual Savings Account investment application forms',
      category: 'ISA Products',
      data: {
        companyName: 'Premier ISA Managers',
        companyAddress: '789 Savings Road, Manchester, UK',
        companyPhone: '+44 161 234 5678',
        companyEmail: 'isa@premierisa.co.uk',
        companyWebsite: 'www.premierisa.co.uk',
        logoUrl: '',
        formTitle: 'Stocks & Shares ISA Application Form',
        plan1Name: 'Balanced Growth ISA Portfolio',
        plan1Code: 'ISA001',
        plan2Name: 'Conservative Income ISA Plan',
        plan2Code: 'ISA002',
        plan3Name: 'Aggressive Growth ISA Fund',
        plan3Code: 'ISA003',
        closingDate: '31 March 2024'
      },
      createdAt: '2024-02-01'
    }
  ]);

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: ''
  });
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['Investment Bonds', 'Structured Products', 'ISA Products', 'Pension Plans', 'Unit Trusts'];

  /**
   * Save current configuration as a new template
   */
  const saveTemplate = () => {
    if (!newTemplate.name.trim()) return;

    const template: Template = {
      id: Date.now().toString(),
      name: newTemplate.name,
      description: newTemplate.description,
      category: newTemplate.category,
      data: currentData,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTemplates(prev => [...prev, template]);
    setNewTemplate({ name: '', description: '', category: '' });
    setShowSaveDialog(false);
  };

  /**
   * Load a template configuration
   */
  const loadTemplate = (template: Template) => {
    onLoadTemplate(template.data);
  };

  /**
   * Delete a template
   */
  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  /**
   * Export template to JSON file
   */
  const exportTemplate = (template: Template) => {
    const blob = new Blob([JSON.stringify(template, null, 2)], {
      type: 'application/json;charset=utf-8'
    });
    saveAs(blob, `${template.name.replace(/\s+/g, '_')}_template.json`);
  };

  /**
   * Import template from JSON file
   */
  const importTemplate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const template = JSON.parse(e.target?.result as string);
          template.id = Date.now().toString();
          setTemplates(prev => [...prev, template]);
        } catch (error) {
          console.error('Invalid template file');
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <Card className="mb-6 border-purple-200 bg-purple-50">
      <CardHeader>
        <CardTitle className="text-purple-800 flex items-center justify-between">
          <span>Template Library</span>
          <div className="flex space-x-2">
            <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="text-purple-700">
                  <Save className="h-4 w-4 mr-1" />
                  Save Current
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Template</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="templateName">Template Name</Label>
                    <Input
                      id="templateName"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter template name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="templateDescription">Description</Label>
                    <Input
                      id="templateDescription"
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of this template"
                    />
                  </div>
                  <div>
                    <Label htmlFor="templateCategory">Category</Label>
                    <Select 
                      value={newTemplate.category} 
                      onValueChange={(value) => setNewTemplate(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={saveTemplate} className="w-full">
                    Save Template
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <input
              type="file"
              accept=".json"
              onChange={importTemplate}
              className="hidden"
              id="import-template"
            />
            <Label htmlFor="import-template" className="cursor-pointer">
              <Button size="sm" variant="outline" className="text-purple-700" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-1" />
                  Import
                </span>
              </Button>
            </Label>
          </div>
        </CardTitle>
        <p className="text-sm text-purple-600">
          Save, load, and share training configurations
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map(template => (
            <Card key={template.id} className="border border-purple-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{template.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <p className="text-xs text-gray-500 mb-3">Created: {template.createdAt}</p>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => loadTemplate(template)}
                    className="flex-1"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Load
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => exportTemplate(template)}
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteTemplate(template.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateLibrary;