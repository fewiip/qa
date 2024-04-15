import { useParams } from "react-router-dom"
import { AppLayout } from "../../../../shared/components/AppLayout"
import { useState, useEffect } from "react";
import { Lesson, useLessons } from "../../api/useLessons.hook";
import styles from './EditLessonPage.module.css'
import { EditLessonCard } from "../../components/EditLessonCard";
export const EditLessonPage = () => {
  const { id } = useParams()

  const { getLesson } = useLessons();
  const [lesson, setLesson] = useState<Lesson>();

  async function fetchlesson() {
    const response = await getLesson(parseInt(id as string));
    setLesson(response.data)
  }

  useEffect(() => {
    fetchlesson()
  }, [])

  return <>
    <AppLayout variant='grey'>
      <div className={styles.contentWrapper}>
        {lesson && <EditLessonCard lesson={lesson} />}
      </div>
    </AppLayout>
  </>
}