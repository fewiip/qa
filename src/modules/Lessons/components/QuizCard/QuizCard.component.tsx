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
import { RadioGroup } from "../../../../shared/components/RadioGroup/RadioGroup.component";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/components/Button/Button.component";

import graph from "../../../../assets/images/graph.png";
import correctIcon from "../../../../assets/images/correct-icon.png";
import wrongIcon from "../../../../assets/images/wrong-icon.png";

interface QuizCardProps {
  quiz: Quiz;
  lessonID: number;
  onNextQuestionClick: () => void
}

const STATE = {
  unanswered: "unanswered",
  wrongAnswer: "wrongAnswer",
  correctAnswer: "correctAnswer",
};

type State = keyof typeof STATE;

export const QuizCard: FunctionComponent<QuizCardProps> = (props) => {
  const { lessonID, quiz, onNextQuestionClick } = props;
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

    console.log(options[correctAnswer].value, selectedAnswer, "RESPOSTAS");

    if (options[correctAnswer].value === parseInt(selectedAnswer) + 1) {
      setCurrentState("correctAnswer");
      toast("resposta certa");
    } else {
      setCurrentState("wrongAnswer");
      toast("resposta errada");
    }
  }

  function handleEditClick() {
    navigate(`/edit/lesson/${lessonID}/quiz/${quiz?.id}`);
  }

  return (
    <div className={styles.quizCardWrapper}>
      {/*JSON.stringify(correctAnswer)*/}
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

        {/*JSON.stringify(selectedAnswer)*/}
        <div className={styles.answers}>
          <Button
            style={{ padding: "16px", borderRadius: "8px", fontSize: "12px" }}
            onClick={handleVerify}
          >
            Verificar
          </Button>
          <Button
            style={{ padding: "16px", borderRadius: "8px", fontSize: "12px" }}
            onClick={handleEditClick}
          >
            Editar
          </Button>
        </div> 
      </div>

      {currentState === STATE.wrongAnswer && (
        <div className={styles.colorBoxRed}>
           <div className={styles.content}>
            <div className={styles.rowWrap}>
              <div className={styles.row}>
                <div>
                  <img src={wrongIcon} alt="" />
                </div>
                <div className={styles.answerText}>
                  <h1>Ops! Resposta incorreta!</h1>
                  <p>A resposta correta é: </p>
                </div>
              </div>
              <div>

              <Button color="red">Continuar</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentState === STATE.correctAnswer && (
        <div className={styles.colorBoxGreen}>
          <div className={styles.content}>
            <div className={styles.rowWrap}>
              <div className={styles.row}>
                <div>
                  <img src={correctIcon} alt="" />
                </div>
                <div className={styles.answerText}>
                  <h1  className={styles.titleMessage}>Correto!</h1>
                  <p>A resposta correta é: </p>
                </div>
              </div>
              <div>
                <Button color="green" onClick={onNextQuestionClick}>Continuar</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
