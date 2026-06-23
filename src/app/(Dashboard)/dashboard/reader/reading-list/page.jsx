import ReadingList from '@/components/Reader/ReadingList/ReadingList';
import { getUserSession } from '@/lib/core/session';
import { getReaderReadingList } from '@/lib/fetch/readingList';
import React from 'react';

const ReadingListPage = async () => {
  const user =  await getUserSession()
  const readingList = await getReaderReadingList(user?.id)
  return (
    <div>
      <ReadingList readingList={readingList}/>
    </div>
  );
};

export default ReadingListPage;