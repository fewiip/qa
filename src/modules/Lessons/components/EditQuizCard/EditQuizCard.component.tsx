import { FunctionComponent, useEffect, useState } from "react";
import { Quiz, QuizPOST, useLessons } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./EditQuizCard.module.css";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "../../../../shared/components/Button/Button.component";
import { Input } from "../../../../shared/components/Input";
import { Tip } from "../../../../shared/components/Tip";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import radioButton2 from "../../../../assets/images/radioButton2.png"


interface EditQuizCardProps {
  quiz: Quiz;
  courseid: number;
  lessonID: number;
}

export const EditQuizCard: FunctionComponent<EditQuizCardProps> = (props) => {
  const { lessonID, courseid } = props;
  const { quiz } = props;
  const { editQuiz, isCourseOwner } = useLessons();
  const navigate = useNavigate();
  const [ownership, setOwnership] = useState(false); 
  const { user } = useAuthStore();
  

  useEffect(() => { 
    fetchOwnership();
  }, []); 

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

  const [quizName, setlessonName] = useState(quiz.name);
  const [quizText, setlessonText] = useState<string | undefined>(quiz.text);
  const [quizcorrectAnswer, setquizcorrectAnswer] = useState(
    quiz.correctAnswer
  );
  const [quizAnswer1, setquizAnswer1] = useState<string>(
    quiz.answer[0] ? quiz.answer[0]["text"] : ""
  );
  const [quizAnswer2, setquizAnswer2] = useState<string>(
    quiz.answer[1] ? quiz.answer[1]["text"] : ""
  );
  const [quizAnswer3, setquizAnswer3] = useState<string>(
    quiz.answer[2] ? quiz.answer[2]["text"] : ""
  );
  const [quizAnswer4, setquizAnswer4] = useState<string>(
    quiz.answer[3] ? quiz.answer[3]["text"] : ""
  );
  const [quizAnswer5, setquizAnswer5] = useState<string>(
    quiz.answer[4] ? quiz.answer[4]["text"] : ""
  );
  //const [quizAnswers, setQuizAnswers] = useState(quiz.answer);

  function handleCancel () {
    navigate(`/course/${courseid}/lesson/${lessonID}/quiz/${quiz.id}`)
  }

  async function handleSubmit() {
    //verificando se eh nulo
    if (
      quizName !== "" &&
      quizText !== "" &&
      quizAnswer1 !== "" &&
      quizAnswer2 !== "" &&
      quizAnswer3 !== "" &&
      quizAnswer4 !== "" &&
      quizAnswer5 !== ""
    ) {
      try {
        const payload: QuizPOST = {
          name: quizName,
          text: quizText || "",
          image: [],
          correctAnswer: quizcorrectAnswer,
          answerRequests: [
            {
              text: quizAnswer1,
            },
            {
              text: quizAnswer2,
            },
            {
              text: quizAnswer3,
            },
            {
              text: quizAnswer4,
            },
            {
              text: quizAnswer5,
            },
          ],
        };

        console.log(payload);
        const response = await editQuiz(payload, quiz.id);
        console.log(response);

        navigate(`/course/${courseid}/lesson/${lessonID}/quiz/${quiz.id}`)
        //navigate(`/course/${courseid}/lesson/${lessonID}/quiz/${quiz.id}`);
      } catch (error) {
        toast.error("Alguma coisa deu errado!" + error);
      }
    } else {
      toast.error("Nome e textos não podem ser nulos");
    }
  }

  return (<>
    {ownership && (<>
    
    <div data-color-mode="light">
      <div>
        <b>Título:</b>
      </div>
      <div className={styles.editQuizTitle}>
        <Input
          type="text"
          value={quizName}
          onChange={(i) => setlessonName(i.target.value)}
        />
      </div>
      <div className={styles.space}></div>
      <div>
        <b>Corpo:</b>
      </div>
      <div className={styles.editQuizTitle}>
        <MDEditor value={quizText} onChange={setlessonText} height="20%" />
      </div>
      <div className={styles.space}></div> 
      <Tip>
        defina qual é a alternativa correta marcando o círculo apresentado antes da respectiva resposta <img src={radioButton2} className={styles.smallImg} />
      </Tip>
      <div>
        <b>Respostas:</b>
      </div>
      {/*{quiz.answer.map((i) => (
            <div>
                <p>{i.text}</p>
                <input type="text" value={i.text} />
            </div>
        ))
        }*/}

      <div className={styles.editQuizAnswers}>
        {/*
        <div>
          <p>Resposta correta:</p>
          <Input
            type="text"
            value={quizcorrectAnswer}
            onChange={(i) => setquizcorrectAnswer(parseInt(i.target.value))}
          />
        </div>
        */}

        <div>
          <p>Resposta 1:</p>
          <div className={styles.row}>
            <input
              type="radio"
              name="correctAnswer"
              checked={quizcorrectAnswer == 0}
              onChange={() => {
                setquizcorrectAnswer(0);
              }}
            />
            <Input
              type="text"
              value={quizAnswer1}
              onChange={(i) => setquizAnswer1(i.target.value)}
            />
          </div>
        </div>
        <div>
          <p>Resposta 2:</p>
          <div className={styles.horizontalSpace}></div>
          <div className={styles.row}>
            <input
              type="radio"
              name="correctAnswer"
              checked={quizcorrectAnswer == 1}
              onChange={() => {
                setquizcorrectAnswer(1);
              }}
            />
            <Input
              type="text"
              value={quizAnswer2}
              onChange={(i) => setquizAnswer2(i.target.value)}
            />
          </div>
        </div>
        <div>
          <p>Resposta 3:</p>
          <div className={styles.row}>
            <input
              type="radio"
              name="correctAnswer"
              checked={quizcorrectAnswer == 2}
              onChange={() => {
                setquizcorrectAnswer(2);
              }}
            />
            <Input
              type="text"
              value={quizAnswer3}
              onChange={(i) => setquizAnswer3(i.target.value)}
            />
          </div>
        </div>
        <div>
          <p>Resposta 4:</p>
          <div className={styles.row}>
            <input
              type="radio"
              name="correctAnswer"
              checked={quizcorrectAnswer == 3}
              onChange={() => {
                setquizcorrectAnswer(3);
              }}
            />
            <Input
              type="text"
              value={quizAnswer4}
              onChange={(i) => setquizAnswer4(i.target.value)}
            />
          </div>
        </div>
        <div>
          <p>Resposta 5:</p>
          <div className={styles.row}>
            <input
              type="radio"
              name="correctAnswer"
              checked={quizcorrectAnswer == 4}
              onChange={() => {
                setquizcorrectAnswer(4);
              }}
            />
            <Input
              type="text"
              value={quizAnswer5}
              onChange={(i) => setquizAnswer5(i.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 

        <div>

            <button>Adicionar questao</button>
        </div>

            } */}

      <div>
        <Button
          style={{ padding: "16px", borderRadius: "8px", fontSize: "12px" }}
          onClick={handleSubmit}
        >
          Salvar
        </Button>
        <Button
          style={{ padding: "16px", borderRadius: "8px", fontSize: "12px" }}
          onClick={handleCancel}
        >
          Cancelar
        </Button>
      </div>
    </div>


    </>)}
  </>
  );
};
