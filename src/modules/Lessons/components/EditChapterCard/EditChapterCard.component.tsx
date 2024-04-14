import { FunctionComponent, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import { Chapter, Quiz, useLessons } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import styles from './EditChapterCard.module.css'
import MDEditor from "@uiw/react-md-editor";
import { Input } from "../../../../shared/components/Input";
import { Button } from "../../../../shared/components/Button/Button.component";

interface EditChapterCardProps {
    chapter: Chapter
}

export const EditChapterCard: FunctionComponent<EditChapterCardProps> = (props) => {
    const { chapter } = props
    const { editChapter } = useLessons()
    const navigate = useNavigate()

    const  [ questoes, setQuestoes] = useState([]);

    const [chapterName, setChapterName] = useState(chapter?.name);
    const [chapterText, setChapterText] = useState<string | undefined>(chapter?.text);


    async function handleSubmit() {
        try {
            chapter.name = chapterName
            chapter.text = chapterText || ''

            console.log(chapter)
            const response = await editChapter(chapter)


            navigate(`/chapter/${chapter.id}`)
        } catch (error) {
            toast.error('Alguma coisa deu errad!')
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