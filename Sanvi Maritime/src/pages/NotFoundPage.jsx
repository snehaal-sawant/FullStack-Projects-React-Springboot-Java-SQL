import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-20 h-20 bg-sky-50 text-maritime-blue rounded-full flex items-center justify-center border-2 border-sky-200">
        <Anchor className="w-10 h-10" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-4xl font-extrabold text-navy-950 font-heading">404 - Off Course</h1>
        <p className="text-sm text-slate-600">
          The marine page or spare part document you are looking for has been moved or does not exist.
        </p>
      </div>

      <Link to="/">
        <Button variant="primary" icon={ArrowLeft}>
          Return to Homepage
        </Button>
      </Link>
    </div>
  );
};
