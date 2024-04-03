import styles from './QuizPage.module.css'
import { Quiz, useLessons } from "../../api"
import { QuizCard } from "../../components/QuizCard/QuizCard.component"
import { NavigationBar } from "../../../../shared/components/NavigationBar/NavigationBar.component"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppLayout } from '../../../../shared/components/AppLayout';

export const QuizPage = () => {
    const { id } = useParams()

    const { getQuiz } = useLessons();
    const [quiz, setQuiz] = useState<Quiz>();

    async function fetchQuiz() {
        const response = await getQuiz(parseInt(id as string));
        setQuiz(response.data)
    }

    useEffect(() => {
        fetchQuiz()
    }, [])


    const questao1: Quiz = {
        id: 1,
        lesson_id: 13,
        name: "Escolha a opção correta",
        text: "O processo para derivar casos de teste a partir do criterio Grafo Causa-Efeito pode ser resumido em alguns passos, cuja a ordem de execução é: \n \
        () Converter o grafo em uma tabela de decisão, na qual cada coluna representa um caso de teste \n \
        () Dividir a especificação do software em partes \n \
        () Converter as colunas da tabela de decisão  em casos de teste",
        image: ["dssdds"],
        correctAnswer: 1,
        answer: [
            {
                id: 1,
                text: "5-2-3"
            },
            {
                id: 2,
                text: "2-2-2"
            },
            {
                id: 3,
                text: "1-2-3"
            }
        ]
    }


    return <AppLayout >
        <div className={styles.quizWrapper}>
            {quiz && <QuizCard quiz={quiz} />}
        </div>
    </AppLayout>

}