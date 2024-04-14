import { FunctionComponent, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import { Chapter, Quiz, useLessons } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import styles from './CreateChapterCard.module.css'
import MDEditor from "@uiw/react-md-editor";
import { Input } from "../../../../shared/components/Input";
import { Button } from "../../../../shared/components/Button/Button.component";

interface CreateChapterCardProps {
    lessonID: number
}

export const CreateChapterCard: FunctionComponent<CreateChapterCardProps> = (props) => {
    const chapter:Chapter = {
        id:0,
        text:'',
        name: '',
        quizzes: []
    }
    
    
    const {lessonID} = props
    
    const { createChapter } = useLessons()
    const navigate = useNavigate()

    const  [ questoes, setQuestoes] = useState([]);

    const [chapterName, setChapterName] = useState('');
    const [chapterText, setChapterText] = useState<string | undefined>('');


    async function handleSubmit() {
        try {

            chapter.name = chapterName
            chapter.text = chapterText || ''

            console.log(chapter)
            const response = await createChapter(chapter)


            navigate('/')
        } catch (error) {
            toast.error('Alguma coisa deu errado!')
        }
    }

    return <div data-color-mode="light">
        <CenterCard>
            <div className={styles.chapterTitle}>
                <Input type="text" value={chapterName} onChange={(i) => setChapterName(i.target.value)} />
            </div>

            <div className={styles.chapterText}>
                <MDEditor
                    value={chapterText}
                    onChange={setChapterText}
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