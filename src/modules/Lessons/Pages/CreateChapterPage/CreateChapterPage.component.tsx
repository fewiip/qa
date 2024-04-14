import { useParams } from "react-router-dom"
import { AppLayout } from "../../../../shared/components/AppLayout"
import { useState, useEffect } from "react";
import { CreateChapterCard} from "../../components/CreateChapterCard/CreateChapterCard.component"
import { Chapter, useLessons } from "../../api/useLessons.hook";

import styles from './EditChapterPage.module.css'
export const EditChapterPage = () => {
  const { lessonid } = useParams() 
  return <>
    <AppLayout variant='grey'>
      <div className={styles.contentWrapper}>
        {lessonid && <CreateChapterCard lessonID={parseInt(lessonid as string)} />}
      </div>
    </AppLayout>
  </>
}