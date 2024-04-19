import { Button } from "../../../../shared/components/Button/Button.component"
import { Input } from "../../../../shared/components/Input"
import { FunctionComponent, useEffect, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import { ChapterPOST, Course, useLessons } from "../../api";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import styles from "./EditCourseCard.module.css"

interface EditCourseCardProps {
    courseid: number
}
export const EditCourseCard: FunctionComponent<EditCourseCardProps> = (props) => {
    const { courseid } = props
    const { getCourse, createChapter } = useLessons();
    const [course, setCourse] = useState<Course>()
    const [chapterName, setChapterName] = useState('');
    let message = 'tudo ok'
    const navigate = useNavigate()

    async function fetchCourse() {
        try {
            const response = await getCourse(courseid);
            setCourse(response.data)
        } catch {
            toast.error('Alguma coisa deu errad!')
            message = 'ID não encontrado'
        }

    }

    useEffect(() => {
        fetchCourse()
    }, [])

    async function handleCreateChapter() {
        try {

            let chapter : ChapterPOST = {
                name: chapterName
            }

            console.log(course)
            const response = await createChapter(chapter, courseid)
            console.log(response.data.id)
            fetchCourse()
            //navigate(`/courses/edit/${courseid}`)
        } catch (error) {
            toast.error('Alguma coisa deu errado!')
        }
    }
    return <>
        <CenterCard>
            <div className={styles.title}>Hirarquia dos conteudos</div>
            {
                !course && <p>ID não encontrado</p>
            }
            {course && <div> <div className={styles.listItemCourse}>{course?.name} <a href="">(Criar Capitulo)</a></div>  <ul className={styles.listBlock}>{course.chapters.map((i) => (<li>
                <div className={styles.listItemChapter}> {i.name} <a href={`/chapter/${i.id}/lesson/add`}>(Criar uma Lição)</a></div>
                
                <ul className={styles.listBlock}>
                    {i.lessons.map((j) => (
                        <li> <div className={styles.listItemLesson}> <a href={`/lesson/${j.id}`}> {j.name}</a>  <a href={`/lesson/${j.id}/quiz/add`}> (Criar um quiz)</a></div>
                            <ul className={styles.listBlock}>
                                {j.quizzes.map((k) => (
                                    <li> <div className={styles.listItemQuiz}><a href={`/lesson/${j.id}/quiz/${k.id}`}>{k.name}</a></div> 
                                        
                                    </li>
                                ))}
                                <div className={styles.space}></div>
                            </ul>
                        </li>
                    ))}
                </ul>
            </li>

            ))}</ul>
            </div>}

<div>
                    <Input placeholder='Nome do capitulo' value={chapterName} onChange={(i) => setChapterName(i.target.value)}></Input>
                    <Button onClick={handleCreateChapter}>Criar Capitulo</Button>
                </div>
        </CenterCard>
    </>
}