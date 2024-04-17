import { FunctionComponent, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import { Chapter, Lesson, LessonPOST, Quiz, useLessons } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import styles from './CreateLessonCard.module.css'
import MDEditor from "@uiw/react-md-editor";
import { Input } from "../../../../shared/components/Input";
import { Button } from "../../../../shared/components/Button/Button.component";

interface CreateLessonCardProps {
    chapterID: number
}

export const CreateLessonCard: FunctionComponent<CreateLessonCardProps> = (props) => {
    
    
    
    const {chapterID} = props
    
    const { createLesson } = useLessons()
    const navigate = useNavigate()

    const  [ questoes, setQuestoes] = useState([]);

    const [lessonName, setLessonName] = useState('');
    const [lessonText, setLessonText] = useState<string | undefined>('');


    async function handleSubmit() {
        try {
            const lesson:LessonPOST = { 
                text:'',
                name: '', 
            }

            lesson.name = lessonName
            lesson.text = lessonText || ''

            console.log(lesson)
            const response = await createLesson(lesson, chapterID)

            console.log("id da resposta "+response.data.id)
            navigate(`/lesson/${response.data.id}`)
        } catch (error) {
            toast.error('Alguma coisa deu errado!')
        }
    }

    return <div data-color-mode="light">
        <CenterCard>
            <div className={styles.lessonTitle}>
                <Input type="text" value={lessonName} onChange={(i) => setLessonName(i.target.value)} />
            </div>

            <div className={styles.lessonText}>
                <MDEditor
                    value={lessonText}
                    onChange={setLessonText}
                    height='100%'
                />

                {/* {quiz.map(i => <div>i</div>)} */}

            </div>
            

            <div className={styles.options}>
                <Button style={{ padding: '16px', borderRadius: '8px', fontSize: '12px'}} onClick={handleSubmit}>
                    Salvar
                </Button>
            </div>
        </CenterCard>
    </div >
}