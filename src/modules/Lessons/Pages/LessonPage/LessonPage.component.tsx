import { LessonCard } from "../../components/LessonCard/LessonCard.component";
import { useState, useEffect } from "react";
import { Lesson, useLessons } from "../../api/useLessons.hook";
import { useParams } from "react-router-dom";
import styles from './LessonPage.module.css'
import { AppLayout } from "../../../../shared/components/AppLayout";
import { QuizCard } from "../../components/QuizCard/QuizCard.component";

export const LessonPage = () => {
  const { id } = useParams()

  const { getLesson } = useLessons();
  const [lesson, setLesson] = useState<Lesson>();
  const [isQuiz, setIsQuiz] = useState(false)

  async function fetchLesson() {
    const response = await getLesson(parseInt(id as string));
    setLesson(response.data)
  }

  useEffect(() => {
    fetchLesson()
  }, [])

  return <AppLayout variant='grey'>
  <div className={styles.lessonWrapper}>
    {lesson && <LessonCard lesson={lesson} />}
    {!lesson && <h1>Erro</h1>}
  </div>
  </AppLayout>
  
  }