import styles from './ChapterCard.module.css'
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks";
import { FunctionComponent } from "react"
import { Chapter } from "../../api";

interface ChapterCardProps {
    chapter: Chapter | undefined
}

export const ChapterCard: FunctionComponent<ChapterCardProps> = (props) => { 
  const {chapter} = props

  return <> 
  <div className={styles.cardWrapper}>
  
  <div className={styles.chapterTitle}><h2>{chapter?.name}</h2></div>
  <ReactMarkdown remarkPlugins={[remarkBreaks]}> 
  {chapter?.text}
  </ReactMarkdown> 
  <div> livros</div>
  </div>
  </>
}