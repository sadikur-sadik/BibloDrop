import React from 'react';
import SavedCommentsView from '@/components/SavedComments/SavedCommentsView';

export const metadata = {
  title: "Saved Comments | Reader Dashboard | BiblioDrop",
  description: "View and manage your saved reader activity comments and community insights on BiblioDrop.",
};

export default function ReaderSavedCommentsPage() {
  return <SavedCommentsView />;
}
