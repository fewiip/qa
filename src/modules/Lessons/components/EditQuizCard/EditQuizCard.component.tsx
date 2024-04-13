import { FunctionComponent, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import { Chapter, Quiz, useLessons } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import styles from './EditQuizCard.module.css'
import MDEditor from "@uiw/react-md-editor";


interface EditQuizCardProps {
    quiz: Quiz
    chapterID: number
}

export const EditQuizCard: FunctionComponent<EditQuizCardProps> = (props) => {
    const {chapterID} = props
    const { quiz } = props 
    const { putQuiz } = useLessons()
    const navigate = useNavigate()

    const [quizName, setChapterName] = useState(quiz?.name);
    const [quizText, setChapterText] = useState<string | undefined>(quiz?.text);


    async function handleSubmit() {
        try {
            quiz.name = quizName
            quiz.text = quizText || ''

            console.log(quiz)
            const response = await putQuiz(quiz)


            navigate(`/chapter/${chapterID}/quiz/${quiz.id}`)
        } catch (error) {
            toast.error('Alguma coisa deu errado!')
        }
    }

    return <div data-color-mode="light">
        <CenterCard>
            <div>
                <input type="text" value={quizName} onChange={(i) => setChapterName(i.target.value)} />
            </div>

            <MDEditor
                value={quizText}
                onChange={setChapterText}
                height='100%'
            />

            {/* {quiz.map(i => <div>i</div>)} */}

            <div>
                <input type="text" placeholder='questao' />
                <button >Adicionar questao</button>
            </div>

            <div>
                <input type="text" placeholder='questao' />
                <button>Adicionar questao</button>
            </div>

            <div>
                <button onClick={handleSubmit}>
                    Salvar
                </button>
            </div>
        </CenterCard>
    </div >
}