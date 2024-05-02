import { FunctionComponent } from 'react'
import styles from './LessonsCard.module.css'
import { Chapter, User, useLessons } from "../../api"
import { LessonButton } from "../LessonButton"
import { Button } from "../../../../shared/components/Button/Button.component";
import { useNavigate } from 'react-router-dom';

interface ChaptersCardProps {
    chapters: Chapter[]
}

export const ChaptersCard: FunctionComponent<ChaptersCardProps> = (props) => {
    const { chapters } = props
    const navigate = useNavigate()
    
    function handleCreateChapterClick(chapterid: number) {
        navigate(`/chapter/${chapterid}/lesson/add`) //old
    }

    return (
        <>

            <div className={styles.lessonsWrapper}>
                
                    {chapters.map((i) => (
                        <div className={styles.lessonsLine} key={i.id}>
                        
                            <div className={styles.lessonTitle}  > 
                                <p>{i.name} </p> 
                                {/*<Button size='small' onClick={() => handleCreateChapterClick(i.id)}>Adicionar Lição</Button>*/}
                                
                            </div>
                            <div className={styles.lessonsColumn} >
                                {i.lessons.map(
                                    (j) => (<LessonButton name={j.name} lessonid={j.id} key={j.id} />)
                                )}
                            </div>
                        </div>
                    ))}
                

            </div>

        </>
    ) 
}