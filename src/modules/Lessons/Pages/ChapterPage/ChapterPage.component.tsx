import { NavigationBar } from "../../../../shared/components/NavigationBar/NavigationBar.component";
import { ChapterCard } from "../../components/ChapterCard/ChapterCard.component";
import { useState, useEffect } from "react";
import { Chapter, useLessons } from "../../api/useLessons.hook";
import { useParams } from "react-router-dom"; 
import styles from './ChapterPage.module.css'

export const ChapterPage = () => { 
  const {id} = useParams() 
  
  const {getChapter} = useLessons();
  const [chapter, setChapter] = useState<Chapter>();
 
  
  async function fetchChapter() {
    const response = await getChapter(parseInt(id as string));
    setChapter(response.data)
  }

  useEffect(() => {
    fetchChapter() 
  }, [])
   
 
  return <>
  
  <NavigationBar/>
  <div className={styles.chapterWrapper}>
  <ChapterCard chapter={chapter} />
  </div>
  
  </>
}