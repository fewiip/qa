import { AppLayout } from "../../../../shared/components/AppLayout"
import { useState, useEffect } from "react";
import { CreateLessonCard} from "../../components/CreateLessonCard/CreateLessonCard.component"
import { Lesson, useLessons } from "../../api/useLessons.hook";
import { useParams } from "react-router-dom"
import styles from './CreateLessonPage.module.css'

export const CreateLessonPage = () => {
  const { chapterid } = useParams() 
  return <AppLayout variant='grey'>
      <div className={styles.contentWrapper}>
        {chapterid && <CreateLessonCard chapterID={parseInt(chapterid as string)} />}
      </div>
    </AppLayout>
  
}