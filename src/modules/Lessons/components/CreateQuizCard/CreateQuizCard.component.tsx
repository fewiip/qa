import { FunctionComponent, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import { Lesson, QuizPOST, Quiz, useLessons } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import styles from './CreateQuizCard.module.css'
import MDEditor from "@uiw/react-md-editor";
import { Button } from '../../../../shared/components/Button/Button.component';
import { Input } from "../../../../shared/components/Input";

interface CreateQuizCardProps {
    lessonID: number
}

export const CreateQuizCard: FunctionComponent<CreateQuizCardProps> = (props) => {
    const { lessonID } = props

    const { createQuiz } = useLessons()
    const navigate = useNavigate()

    const [quizName, setlessonName] = useState('');
    const [quizText, setlessonText] = useState<string | undefined>('');
    const [quizcorrectAnswer, setquizcorrectAnswer] = useState(1);
    const [quizAnswer1, setquizAnswer1] = useState('');
    const [quizAnswer2, setquizAnswer2] = useState('');
    const [quizAnswer3, setquizAnswer3] = useState('');
    const [quizAnswer4, setquizAnswer4] = useState('');
    const [quizAnswer5, setquizAnswer5] = useState('');

    async function handleSubmit() {
        try {
            let quiz: Quiz = {
                id: 0, 
                name: quizName,
                text: quizText || '',
                image: [],
                correctAnswer: quizcorrectAnswer,
                answer: [
                    {
                        id: 1,
                        text: quizAnswer1
                    },
                    {
                        id: 2,
                        text: quizAnswer2
                    },
                    {
                        id: 3,
                        text: quizAnswer3
                    },
                    {
                        id: 4,
                        text: quizAnswer4
                    },
                    {
                        id: 5,
                        text: quizAnswer5
                    }
                ]
            };


            console.log(quiz)
            const response = await createQuiz(quiz)
            console.log(response)

            navigate(`/lesson/${lessonID}/quiz/${quiz.id}`)
        } catch (error) {
            toast.error('Alguma coisa deu errado!')
        }
    }

    return <div data-color-mode="light" className={styles.createQuizBody}>

        <div className={styles.createQuizTitle}>
            <Input placeholder="Titulo" type="text" value={quizName} onChange={(i) => setlessonName(i.target.value)} />

        </div>

        <div className={styles.createQuizText}>
            <MDEditor
                value={quizText}
                onChange={setlessonText}
                height='20%'
            />
        </div>

        <div className={styles.createQuizAnswers}>
            {/* {quiz.map(i => <div>i</div>)} */}
            <div>
                <p>Resposta correta:</p>
                <Input type="text" value={quizcorrectAnswer} onChange={(i) => setquizcorrectAnswer(parseInt(i.target.value))} />
            </div>

            <div>
                <p>Resposta 1:</p>
                <Input type="text" value={quizAnswer1} onChange={(i) => setquizAnswer1(i.target.value)} />
            </div>
            <div>
                <p>Resposta 2:</p>
                <Input type="text" value={quizAnswer2} onChange={(i) => setquizAnswer2(i.target.value)} />
            </div>
            <div>
                <p>Resposta 3:</p>
                <Input type="text" value={quizAnswer3} onChange={(i) => setquizAnswer3(i.target.value)} />
            </div>
            <div>
                <Input type="text" value={quizAnswer4} onChange={(i) => setquizAnswer4(i.target.value)} />
            </div>
            <div>
                <p>Resposta 5:</p>
                <Input type="text" value={quizAnswer5} onChange={(i) => setquizAnswer5(i.target.value)} />
            </div>
        </div>


        <div>

            <button>Adicionar questao</button>
        </div>

        {/* quiz.answer.map((i) => (

                <button>{i.text}</button>
                <input type="text" value={quizAnswer1} onChange={(i) => setlessonName(i.target.value)}  />
                

            ))} */}

        <div>
            <Button style={{ padding: '16px', borderRadius: '8px', fontSize: '12px' }} onClick={handleSubmit}>Salvar</Button>


        </div>

    </div >
}