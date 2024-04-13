import { useParams } from "react-router-dom"
import { AppLayout } from "../../../../shared/components/AppLayout"
import { useState, useEffect } from "react";
import { MarkdownEditorCard } from "../../components/MarkdownEditorCard/MarkdownEditorCard.component"
import { Chapter, useLessons } from "../../api/useLessons.hook";
import styles from './EditChapterPage.module.css'
export const EditChapterPage = () => {
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

  return <>
    <AppLayout variant='grey'>
      <div className={styles.contentWrapper}>
        {chapter && <MarkdownEditorCard chapter={chapter} />}
      </div>
    </AppLayout>
  </>
}