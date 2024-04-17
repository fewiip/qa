import styles from './QuizPage.module.css'
import { Lesson, Quiz, useLessons } from "../../api"
import { QuizCard } from "../../components/QuizCard/QuizCard.component"
import { NavigationBar } from "../../../../shared/components/NavigationBar/NavigationBar.component"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppLayout } from '../../../../shared/components/AppLayout';
import { CenterCard } from '../../components/CenterCard/CenterCard.component';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../shared/components/Button/Button.component';

export const QuizPage = () => {
    const { quizid } = useParams()
    const { lessonid } = useParams()
    const navigate = useNavigate()
    const { getQuiz, getLesson } = useLessons();
    const [quiz, setQuiz] = useState<Quiz>();
    const [lesson, setLesson] = useState<Lesson>();

    async function fetchQuiz() {
        const response = await getQuiz(parseInt(quizid as string));
        setQuiz(response.data)
    }
    async function fetchlesson() {
        const response = await getLesson(parseInt(lessonid as string));
        setLesson(response.data)
    }

    useEffect(() => {
        fetchQuiz(), fetchlesson()
    }, [])



    function isTheLastQuiz() {
        if(!lesson) {
            return false
        }
        let quizzesSize = lesson?.quizzes.length
            if ((lesson?.quizzes[0]['id'] + quizzesSize) == quiz?.id) {
                return true
            }
        
        
    }
    function thisQuizIndex() {
        let i = 0
        if(!lesson) {
            return i
        }

        let quizzesSize = lesson?.quizzes.length
        
        while (i < quizzesSize) {
            if (lesson?.quizzes[i]['id'] === quiz?.id) {
                
                break
            }
            i++
        }
        return i
    }
    function nextQuizID() {
        if (!lesson || !quiz){
            return 0
        }
        let quizzesSize = lesson.quizzes.length 
        if (quiz.id === lesson.quizzes[quizzesSize - 1]['id']) {
            return lesson.quizzes[thisQuizIndex()]['id']
        } else {
            return lesson.quizzes[thisQuizIndex() + 1]['id']
        }

    }
    async function handleNextClick() {
        const response = await getQuiz(nextQuizID() );
        setQuiz(response.data)
    }
    return <AppLayout variant='grey'>
        <div className={styles.contentWrapper}>
        <CenterCard>
            {quiz && lesson && lessonid && <QuizCard quiz={quiz}   lessonID={parseInt(lessonid as string)} key={quiz.id}/>}
            {!isTheLastQuiz() && <div>
            <Button style={{ padding: '16px', borderRadius: '8px', fontSize: '12px' }} onClick={handleNextClick}>Avançar</Button>
        </div>}
        </CenterCard>
        </div>
        
    </AppLayout>

}