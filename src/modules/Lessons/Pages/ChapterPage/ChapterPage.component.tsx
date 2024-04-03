import { ChapterCard } from "../../components/ChapterCard/ChapterCard.component";
import { useState, useEffect } from "react";
import { Chapter, useLessons } from "../../api/useLessons.hook";
import { useParams } from "react-router-dom";
import styles from './ChapterPage.module.css'
import { AppLayout } from "../../../../shared/components/AppLayout";

export const ChapterPage = () => {
  const { id } = useParams()

  const { getChapter } = useLessons();
  const [chapter, setChapter] = useState<Chapter>();
 

  async function fetchChapter() {
    const response = await getChapter(parseInt(id as string));
    setChapter(response.data)
  }

  useEffect(() => {
    fetchChapter()
  }, [])


  return <AppLayout variant='grey'>
    <div className={styles.chapterWrapper}>
      {chapter && <ChapterCard chapter={chapter} />}
      {!chapter && <h1>Erro</h1>}
    </div>
  </AppLayout>

}