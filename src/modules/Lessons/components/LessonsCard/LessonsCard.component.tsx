import { FunctionComponent } from 'react'
import styles from './LessonsCard.module.css'
import { Lesson, User, useLessons } from "../../api"
import { ChapterButton } from "../ChapterButton"


interface LessonsCardProps {
    lessons: Lesson[]
}

export const LessonsCard: FunctionComponent<LessonsCardProps> = (props) => {
    const { lessons } = props

    return (
        <>

            <div className={styles.lessonsWrapper}>
                
                    {lessons.map((i) => (
                        <div className={styles.lessonsLine}>
                        
                            <div className={styles.lessonTitle}> <p>{i.name}</p></div>
                            <div className={styles.lessonsColumn}>
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