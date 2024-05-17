import { useParams } from "react-router-dom"
import { AppLayout } from "../../../../shared/components/AppLayout"
import { useState, useEffect } from "react";
import { Lesson, useLessons } from "../../api/useLessons.hook";
import styles from './EditLessonPage.module.css'
import { EditLessonCard } from "../../components/EditLessonCard";
import { CenterContent } from "../../components/CenterContent";
export const EditLessonPage = () => {
  const { courseid, lessonid } = useParams()

  const { getLesson } = useLessons();
  const [lesson, setLesson] = useState<Lesson>();

  async function fetchlesson() {
    const response = await getLesson(parseInt(lessonid as string));
    setLesson(response.data)
  }

  useEffect(() => {
    fetchlesson()
  }, [])

  return <>
    <AppLayout variant='grey'>
      <div className={styles.contentWrapper}>
        <CenterContent>
        {lesson && courseid && <EditLessonCard courseid={parseInt(courseid)} lesson={lesson} />}
        </CenterContent>
      </div>
    </AppLayout>
  </>
}