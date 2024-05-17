import { FunctionComponent, useEffect, useMemo, useState } from "react";
import styles from "./QuizCard.module.css";
import { Quiz, useLessons } from "../../api";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import professor1_happy from "../../../../assets/images/professor1_happy.png";
import { RadioGroup } from "../../../../shared/components/RadioGroup/RadioGroup.component";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/components/Button/Button.component";

import correctIcon from "../../../../assets/images/correct-icon.png";
import wrongIcon from "../../../../assets/images/wrong-icon.png";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";

interface QuizCardProps {
  quiz: Quiz;
  lessonID: number;
  courseid: number;
  onNextQuestionClick: () => void;
}

const STATE = {
  unanswered: "unanswered",
  wrongAnswer: "wrongAnswer",
  correctAnswer: "correctAnswer",
};

type State = keyof typeof STATE;

export const QuizCard: FunctionComponent<QuizCardProps> = (props) => {
  const { lessonID, quiz, courseid, onNextQuestionClick } = props;
  const navigate = useNavigate();
  const [ownership, setOwnership] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const { user } = useAuthStore();
  const { isSubscribed, isCourseOwner } = useLessons();

  const [selectedAnswer, setSelectedAnswer] = useState();
  const [currentState, setCurrentState] = useState<State>(
    STATE.unanswered as State
  );

  useEffect(() => {
    fetchSubscription();
    fetchOwnership();
  }, []);

  async function fetchSubscription() {
    setSubscription(false);
    console.log(`userID: ${user?.id} ;courseID: ${courseid}`);
    if (user && courseid) {
      try {
        const response = await isSubscribed(user?.id, courseid);
        setSubscription(response.data.isSubscribed);
        console.log(response);
      } catch (error) {
        setSubscription(false);
      }
    }
  }

  async function fetchOwnership() {
    setOwnership(false);
    if (user && courseid) {
      try {
        const response = await isCourseOwner(user?.id, courseid);
        setOwnership(response.data.isOwner);
        console.log(response);
      } catch (error) {
        setOwnership(false);
      }
    }
  }

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

    if (options[correctAnswer].value === parseInt(selectedAnswer)) {
      setCurrentState("correctAnswer");
      toast("resposta certa");
    } else {
      setCurrentState("wrongAnswer");
      toast("resposta errada");
    }
  }

  function handleEditClick() {
    navigate(`/course/${courseid}/lesson/${lessonID}/quiz/edit/${quiz?.id}`);
  }

  return (
    <div className={styles.quizCardWrapper}>
      {/*JSON.stringify(correctAnswer)*/}
      {(subscription || ownership) && (
        <>
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
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                onClick={handleVerify}
              >
                Verificar
              </Button>

              {ownership && (
                <Button
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  onClick={handleEditClick}
                >
                  Editar
                </Button>
              )}
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
                      <p>A resposta correta é: {quiz.answer[correctAnswer].text} </p>
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
                      <h1 className={styles.titleMessage}>Correto!</h1>
                      <p>A resposta correta é: {quiz.answer[correctAnswer].text}</p>
                    </div>
                  </div>
                  <div>
                    <Button color="green" onClick={onNextQuestionClick}>
                      Continuar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
