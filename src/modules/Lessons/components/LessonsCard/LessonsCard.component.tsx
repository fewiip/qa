import { FunctionComponent } from 'react'
import styles from './LessonsCard.module.css'
import { Lesson, User, useLessons } from "../../api"
import { ChapterButton } from "../ChapterButton"
import { Button } from "../../../../shared/components/Button/Button.component";
import { useNavigate } from 'react-router-dom';

interface LessonsCardProps {
    lessons: Lesson[]
}

export const LessonsCard: FunctionComponent<LessonsCardProps> = (props) => {
    const { lessons } = props
    const navigate = useNavigate()
    
    function handleCreateChapterClick(lessonid: number) {
        navigate(`/lesson/${lessonid}/chapter/add`)
    }

    return (
        <>

            <div className={styles.lessonsWrapper}>
                
                    {lessons.map((i) => (
                        <div className={styles.lessonsLine} key={i.id}>
                        
                            <div className={styles.lessonTitle}  > 
                                <p>{i.name} <Button size='small' onClick={() => handleCreateChapterClick(i.id)}>Adicionar Lição</Button></p> 
                                
                            </div>
                            <div className={styles.lessonsColumn} >
                                {i.chapters.map(
                                    (j) => (<ChapterButton name={j.name} idChapter={j.id} key={j.id} />)
                                )}
                            </div>
                        </div>
                    ))}
                

            </div>

        </>
    ) 
}