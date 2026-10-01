import React from 'react';
import SavedCommentsView from '@/components/SavedComments/SavedCommentsView';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: "Saved Comments | BiblioDrop",
  description: "View and manage your saved reader activity comments and community insights on BiblioDrop.",
};

export default function SavedCommentsPage() {
  return (
    <>
      <SavedCommentsView />
      <Footer />
    </>
  );
}
