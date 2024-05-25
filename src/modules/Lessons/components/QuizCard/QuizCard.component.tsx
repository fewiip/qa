import { FunctionComponent, useEffect, useMemo, useState } from "react";
import styles from "./QuizCard.module.css";
import { IsOpened, Quiz, UserStatistics, useLessons } from "../../api";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import professor1_happy from "../../../../assets/images/professor1_happy.png";
import { RadioGroup } from "../../../../shared/components/RadioGroup/RadioGroup.component";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/components/Button/Button.component";

import correctIcon from "../../../../assets/images/correct-icon.png";
import wrongIcon from "../../../../assets/images/wrong-icon.png";
import spray_colored from "../../../../assets/images/spray_colored.png";
//import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { useQuizStore } from "../../../auth/stores/useQuizStore";

interface QuizCardProps {
  quiz: Quiz;
  quizIndex: number;
  quizzesSize: number;
  userID: number;
  lessonID: number;
  courseID: number;
  onNextQuestionClick: () => void;
}

const STATE = {
  unanswered: "unanswered",
  wrongAnswer: "wrongAnswer",
  correctAnswer: "correctAnswer",
};

type State = keyof typeof STATE;

export const QuizCard: FunctionComponent<QuizCardProps> = (props) => {
  const {
    quizIndex,
    quizzesSize,
    lessonID,
    userID,
    quiz,
    courseID,
    onNextQuestionClick,
  } = props;
  const navigate = useNavigate();
  const coinsIncrement = useQuizStore((state) => state.coinsIncrement);
  const bugsIncrement = useQuizStore((state) => state.bugsIncrement);
  const [ownership, setOwnership] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [userStatistiscs, setUserStatistics] = useState<UserStatistics>();
  //const { user } = useAuthStore();
  const {
    isSubscribed,
    isCourseOwner,
    getUserStatistics,
    subtractRefill,
    setQuizOpened,
  } = useLessons();

  const [selectedAnswer, setSelectedAnswer] = useState();
  const [currentState, setCurrentState] = useState<State>(
    STATE.unanswered as State
  );

  useEffect(() => {
    fetcUserStatistics();
    fetchSubscription();
    fetchOwnership();
  }, []);

  async function fetcUserStatistics() {
    const response = await getUserStatistics(userID);
    setUserStatistics(response.data);
  }

  async function fetchSubscription() {
    setSubscription(false);
    console.log(`userID: ${userID} ;courseID: ${courseID}`);

    try {
      const response = await isSubscribed(userID, courseID);
      setSubscription(response.data.isSubscribed);
      console.log(response);
    } catch (error) {
      setSubscription(false);
    }
  }

  async function fetchOwnership() {
    setOwnership(false);
    try {
      const response = await isCourseOwner(userID, courseID);
      setOwnership(response.data.isOwner);
      console.log(response);
    } catch (error) {
      setOwnership(false);
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

  async function setIsOpen() {
    try {
      const payload: IsOpened = {
        isOpen: true,
        id: quiz.id,
      };
      const response = setQuizOpened(courseID, userID, payload);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleVerify() {
    if (!selectedAnswer) return;

    console.log(options[correctAnswer].value, selectedAnswer, "RESPOSTAS");

    
    if (options[correctAnswer].value === parseInt(selectedAnswer)) {
      setCurrentState("correctAnswer");
      toast("Resposta certa");
      console.log(quiz.isOpen)
      if (quiz.isOpen == false) {
        coinsIncrement();
        bugsIncrement();
      }
    } else {
      setCurrentState("wrongAnswer");
      toast("Resposta errada");
      if (userStatistiscs && userStatistiscs?.refill > 0) {
        bugsIncrement();
        const response1 = await subtractRefill(userID);
        setUserStatistics(response1.data);
        toast("Refil gasto");
        console.log(response1);
      }
    }
    if(!quiz.isOpen) {
      console.log('deixando abrido')
      setIsOpen();
    }
  }

  function handleEditClick() {
    navigate(`/course/${courseID}/lesson/${lessonID}/quiz/edit/${quiz?.id}`);
  }

  return (
    <div className={styles.quizCardWrapper}>
      {(subscription || ownership) && (
        <>
          <div className={styles.content}>
            <div className={styles.imageTextWrapper}>
              <div className={styles.leftSide}>
                <div className={styles.profImage}>
                  <progress
                    value={(quizIndex / quizzesSize) * 100}
                    max="100"
                  ></progress>
                  <p>
                    {quizIndex} / {quizzesSize}
                  </p>
                  <div className={styles.refill}>
                    <img src={spray_colored} alt="" />
                    <b>{userStatistiscs?.refill}</b>
                  </div>

                  <img
                    src={professor1_happy}
                    className={styles.profImagee}
                    alt=""
                  />
                </div>
              </div>

              <div className={styles.quizText}>
                <div className={styles.quizTitle}>
                  <h2>{quiz.name}</h2>
                </div>

                <div>
                  <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                    {quiz.text}
                  </ReactMarkdown>
                </div>

                <div className={styles.answers}>
                  <RadioGroup options={options} onChange={handleRadioChange} />
                </div>
              </div>
            </div>

            <div className={styles.answers}>
              {currentState === STATE.unanswered && (
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
              )}
              {currentState !== STATE.unanswered && (
                <Button
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "grey",
                  }}
                >
                  Verificar
                </Button>
              )}

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
                      <p>
                        A resposta correta é: {quiz.answer[correctAnswer].text}{" "}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button color="red" onClick={onNextQuestionClick}>
                      Continuar
                    </Button>
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
                      <p>
                        A resposta correta é: {quiz.answer[correctAnswer].text}
                      </p>
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
