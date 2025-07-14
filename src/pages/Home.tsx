/**
 * Home page component for the Offshore Bond Application Form
 * This is the main entry point that displays the offshore bond application form
 */

import React from 'react';
import OffshoreApplicationForm from '../components/OffshoreApplicationForm';
import FormHeader from '../components/FormHeader';
import ClientModeAlert from '../components/ClientModeAlert';

/**
 * Home page component that renders the offshore bond application form
 * @returns JSX element containing the complete application form interface
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <FormHeader />
        <ClientModeAlert />
        <OffshoreApplicationForm />
      </div>
    </div>
  );
}

