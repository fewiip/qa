import { NavigationBar } from "../../../../shared/components/NavigationBar/NavigationBar.component";
import { ChapterCard } from "../../components/ChapterCard/ChapterCard.component";
import { useState, useEffect } from "react";
import { Chapter, useLessons } from "../../api/useLessons.hook";

export const ChapterPage = () => { 
  const teste =  {
    id: 1,
  name: "doskmdso",
  text: "dsokmndos"
  } 
  
  const { getChapter} = useLessons();
  const [chapter, setChapter] = useState<Chapter>(teste);
  const chapterID = 13;

  async function fetchChapter() {
    const response = await getChapter(chapterID)
    setChapter(response.data)
  }

  useEffect(() => {
    fetchChapter() 
  }, [])
 
  
 
  return <>
  <div>
  <NavigationBar/>
  </div>
  
  <ChapterCard chapter={chapter}  />
  
  
  </>
}