import { NavigationBar } from "../../../../shared/components/NavigationBar/NavigationBar.component";
import { ChapterCard } from "../../components/ChapterCard/ChapterCard.component";
import { useState, useEffect } from "react";
import { Chapter, useLessons } from "../../api/useLessons.hook";
import { useParams } from "react-router-dom"; 

export const ChapterPage = () => { 
  const {id} = useParams()
  console.log(id);
  
  const { getChapter} = useLessons();
  const [chapter, setChapter] = useState<Chapter>();
 
  /*
  async function fetchChapter() {
    const response = await getChapter(parseInt(id));
    setChapter(response.data)
  }

  useEffect(() => {
    fetchChapter() 
  }, [])
  <ChapterCard chapter={chapter}  />
  */
 
  
 
  return <>
  <div>
  <NavigationBar/>
  </div>
  {id}
  </>
}