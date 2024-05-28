import { LessonCard } from "../../components/LessonCard/LessonCard.component";
import { useState, useEffect } from "react";
import { Lesson, useLessons } from "../../api/useLessons.hook";
import { useParams } from "react-router-dom";
import styles from './LessonPage.module.css'
import { AppLayout } from "../../../../shared/components/AppLayout";  

export const LessonPage = () => {
  const { lessonid, courseid } = useParams()
  const { getLesson  } = useLessons();
  const [lesson, setLesson] = useState<Lesson>(); 

  async function fetchLesson() {
    const response = await getLesson(parseInt(lessonid as string));
    setLesson(response.data)
  }

  useEffect(() => {
    fetchLesson()
  }, [])

  

  return <AppLayout variant='grey'>
  <div className={styles.lessonWrapper}>
    {lesson && courseid && <LessonCard courseid={parseInt(courseid)} lesson={lesson} />}
    {!lesson && <h1></h1>}
  </div>
  </AppLayout>
  
  }