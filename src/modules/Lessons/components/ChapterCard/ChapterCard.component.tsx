import styles from './ChapterCard.module.css'
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks";
import { FunctionComponent } from "react"
import { Chapter } from "../../api";
import professor1_happy from "../../../../assets/images/professor1_happy.png"
import book1 from "../../../../assets/images/book1.jpg"
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../shared/components/Button/Button.component';
import MDEditor from '@uiw/react-md-editor';

interface ChapterCardProps {
  chapter?: Chapter
}

export const ChapterCard: FunctionComponent<ChapterCardProps> = (props) => {
  const { chapter } = props
  const navigate = useNavigate()

  const books: BookProps[] = [
    {
      id: 1,
      name: 'Introdução ao teste de software',
      author: 'Delamaro, Maldonado e Jino',
      img: book1
    },
    {
      id: 2,
      name: 'Introdução ao teste de software',
      author: 'Delamaro, Maldonado e Jino',
      img: book1
    },

  ]

  function handleQuizClick() {
    //navigate(`/quiz/${chapter?.quizzes[0].id}`)
    navigate(`/chapter/${chapter?.id}/quiz/${chapter?.quizzes[0].id}`)
    // chapter/:chapterid/quiz/:quizid
  }

  function handleEditChapterClick() {
    navigate(`/edit/chapter/${chapter?.id}`)
  }
  function handleCreateQuizClick() {
    navigate(`/chapter/${chapter?.id}/quiz/add`)
  }

  return <>
    <div className={styles.cardWrapper}>
      <div className={styles.imgAndText}>
        <div className={styles.profImage}>
          <img src={professor1_happy} alt="" />
        </div>
        <div className={styles.chapterText}>
          <div className={styles.chapterTitle}><h2>{chapter?.name}</h2></div>
          <div className={styles.chapterContent} data-color-mode="light">
            {/* <ReactMarkdown remarkPlugins={[remarkBreaks]}>
              {chapter?.text}
            </ReactMarkdown> */}
            <MDEditor.Markdown source={chapter?.text} style={{ whiteSpace: 'pre-wrap' }} />
          </div>
        </div>

        <div className={styles.books}>
          <div><b>Para saber mais</b></div>
          {books.map((i) => (
            <Book key={i.id} author={i.author} name={i.name} img={i.img} id={i.id} />
          ))}
        </div>
      </div>



      <div className={styles.chapterButtons}>
        <Button onClick={handleQuizClick}>Desafios +10 bugs</Button>
        <Button onClick={handleEditChapterClick}>Editar</Button>
        <Button onClick={handleCreateQuizClick}>Criar um quiz</Button>

      </div>
    </div>
  </>
}

interface BookProps {
  id: number
  img: string
  author: string
  name: string
}

export const Book: FunctionComponent<BookProps> = (props) => {

  const { img, author, name } = props
  return <div className={styles.book}>
    <div><img src={img} alt="" /></div>
    <div className={styles.bookInfo}>
      <b>{name}</b>
      <p>{author}</p>
    </div>
  </div>
}