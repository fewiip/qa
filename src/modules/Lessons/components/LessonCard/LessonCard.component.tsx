import styles from './LessonCard.module.css'
import { FunctionComponent } from "react"
import { Lesson } from "../../api";
import professor1_happy from "../../../../assets/images/professor1_happy.png"
import book1 from "../../../../assets/images/book1.jpg"
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../shared/components/Button/Button.component';
import MDEditor from '@uiw/react-md-editor';

interface LessonCardProps {
  lesson?: Lesson
}

export const LessonCard: FunctionComponent<LessonCardProps> = (props) => {
  const { lesson } = props
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
    
    navigate(`/lesson/${lesson?.id}/quiz/${lesson?.quizzes[0].id}`) 
  }

  function handleEditLessonClick() {
    navigate(`/lesson/edit/${lesson?.id}`)
  }
  function handleCreateQuizClick() {
    navigate(`/lesson/${lesson?.id}/quiz/add`)
  }

  return <>
    <div className={styles.cardWrapper}>
      <div className={styles.imgAndText}>
        <div className={styles.profImage}>
          <img src={professor1_happy} alt="" />
        </div>
        <div className={styles.lessonText}>
          <div className={styles.lessonTitle}><h2>{lesson?.name}</h2></div>
          <div className={styles.lessonContent} data-color-mode="light">
            {/* <ReactMarkdown remarkPlugins={[remarkBreaks]}>
              {lesson?.text}
            </ReactMarkdown> */}
            <MDEditor.Markdown source={lesson?.text} style={{ whiteSpace: 'pre-wrap' }} />
          </div>
        </div>

        <div className={styles.books}>
          <div><b>Para saber mais</b></div>
          {books.map((i) => (
            <Book key={i.id} author={i.author} name={i.name} img={i.img} id={i.id} />
          ))}
        </div>
      </div>



      <div className={styles.lessonButtons}>
        <Button onClick={handleQuizClick}>Desafios +10 bugs</Button>
        <Button onClick={handleEditLessonClick}>Editar</Button>
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