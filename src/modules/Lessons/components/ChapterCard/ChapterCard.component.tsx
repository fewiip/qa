import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks";
import { FunctionComponent } from "react"
import { Chapter } from "../../api";

interface ChapterCardProps {
    chapter: Chapter
}

export const ChapterCard: FunctionComponent<ChapterCardProps> = (props) => { 
  const {chapter} = props

  return <> 
  <ReactMarkdown remarkPlugins={[remarkBreaks]}> 
  {chapter.text}
  </ReactMarkdown> 
  </>
}