import {
  ChangeEvent,
  FunctionComponent,
  InputHTMLAttributes,
  useMemo,
  useState,
} from "react";
import styles from "./QuizCard.module.css";
import { Lesson, Quiz, useLessons } from "../../api";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import professor1_happy from "../../../../assets/images/professor1_happy.png";
import graph from "../../../../assets/images/graph.png";
import { RadioGroup } from "../../../../shared/components/RadioGroup/RadioGroup.component";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/components/Button/Button.component";

interface QuizCardProps {
  quiz: Quiz;
  lessonID: number;
}

const STATE = {
  unanswered: "unanswered",
  wrongAnswer: "wrongAnswer",
  correctAnswer: "correctAnswer",
};

type State = keyof typeof STATE;

export const QuizCard: FunctionComponent<QuizCardProps> = (props) => {
  let { quiz } = props;
  const { lessonID } = props;
  const navigate = useNavigate();

  const [selectedAnswer, setSelectedAnswer] = useState();
  const [currentState, setCurrentState] = useState<State>(
    STATE.unanswered as State
  );

  const correctAnswer = quiz.correctAnswer;

  const options = useMemo(() => {
    return quiz.answer.map((i, index) => ({
      name: "answers",
      label: i.text,
      value: index, 
    }));
  }, [quiz]);

  function handleRadioChange(event: any) {
    setSelectedAnswer(event.target.value);
  }

  function handleVerify() {
    if (!selectedAnswer) return; 

    console.log(options[correctAnswer].value, selectedAnswer, 'RESPOSTAS')

    if (options[correctAnswer].value === parseInt(selectedAnswer) + 1) {
        setCurrentState('correctAnswer')
        toast( "resposta certa" );
    } else {
        setCurrentState('wrongAnswer')
        toast( "resposta errada" )
    }
  }

  function handleEditClick() {
    navigate(`/edit/lesson/${lessonID}/quiz/${quiz?.id}`);
  }

  return (
    <>
    {JSON.stringify(correctAnswer)}
      <div className={styles.content}>
        <div className={styles.imageTextWrapper}>
          <div className={styles.profImage}>
            <img src={professor1_happy} alt="" />
          </div>
          <div className={styles.quizText}>
            <div className={styles.quizTitle}>
              <h2>{quiz.name}</h2>
            </div>

            <div>
              <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                {quiz.text}
              </ReactMarkdown>
              {/*<img src={graph} alt="" />*/}
            </div>
          </div>
        </div>
        <div className={styles.answers}>
          <RadioGroup options={options} onChange={handleRadioChange} />
        </div>

        {JSON.stringify(selectedAnswer)}
        <div>
          <Button
            style={{ padding: "16px", borderRadius: "8px", fontSize: "12px" }}
            onClick={handleVerify}
          >
            Verificar
          </Button>
        </div>
        <div>
          <Button
            style={{ padding: "16px", borderRadius: "8px", fontSize: "12px" }}
            onClick={handleEditClick}
          >
            Editar
          </Button>
        </div>
      </div>

      {currentState === STATE.wrongAnswer && <div className={styles.colorBoxRed}>
        <div className={styles.content}>
            Errado!
        </div> 
      </div>}

      {currentState === STATE.correctAnswer && <div className={styles.colorBoxGreen}>
        <div className={styles.content}>
        Correto!
        <Button>
            Avançar
        </Button>
        </div> 
      </div>}
    </>
  );
};
