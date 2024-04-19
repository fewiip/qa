import { FunctionComponent, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import { Lesson, Quiz, useLessons } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import styles from './EditLessonCard.module.css'
import MDEditor from "@uiw/react-md-editor";
import { Input } from "../../../../shared/components/Input";
import { Button } from "../../../../shared/components/Button/Button.component";

interface EditLessonCardProps {
    lesson: Lesson
}

export const EditLessonCard: FunctionComponent<EditLessonCardProps> = (props) => {
    const { lesson } = props
    const { editLesson } = useLessons()
    const navigate = useNavigate()

    const  [ questoes, setQuestoes] = useState([]);

    const [lessonName, setlessonName] = useState(lesson?.name);
    const [lessonText, setlessonText] = useState<string | undefined>(lesson?.text);


    async function handleSubmit() {
        try {
            lesson.name = lessonName
            lesson.text = lessonText || ''

            console.log(lesson)
            const response = await editLesson(lesson)
            navigate(`/lesson/${lesson.id}`)
        } catch (error) {
            toast.error('Alguma coisa deu errad!')
        }
    }

    return <div data-color-mode="light">
        <CenterCard>
            <div className={styles.lessonTitle}>
                <Input type="text" value={lessonName} onChange={(i) => setlessonName(i.target.value)} />
            </div>

            <div className={styles.lessonText}>
                <MDEditor
                    value={lessonText}
                    onChange={setlessonText}
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