import { FunctionComponent, useState } from "react";
import { QuizPOST, useLessons } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./CreateQuizCard.module.css";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "../../../../shared/components/Button/Button.component";
import { Input } from "../../../../shared/components/Input";
import { Tip } from "../../../../shared/components/Tip";

interface CreateQuizCardProps {
  lessonID: number;
  courseID: number;
}

export const CreateQuizCard: FunctionComponent<CreateQuizCardProps> = (
  props
) => {
  const { courseID, lessonID } = props;

  const { createQuiz } = useLessons();
  const navigate = useNavigate();

  const [quizName, setlessonName] = useState("");
  const [quizText, setlessonText] = useState<string | undefined>("");
  const [quizcorrectAnswer, setquizcorrectAnswer] = useState(1);
  const [quizAnswer1, setquizAnswer1] = useState("");
  const [quizAnswer2, setquizAnswer2] = useState("");
  const [quizAnswer3, setquizAnswer3] = useState("");
  const [quizAnswer4, setquizAnswer4] = useState("");
  const [quizAnswer5, setquizAnswer5] = useState("");

  function handleCancel(){
    navigate(`/course/edit/${courseID}`);
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
        let quiz: QuizPOST = {
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

        console.log(quiz);
        const response = await createQuiz(quiz, lessonID);
        console.log(response);
        navigate(
          `/course/${courseID}/lesson/${lessonID}/quiz/${response.data.id}`
        );
        //navigate(`/course/${courseid}/lesson/${lessonID}/quiz/${quiz.id}`)
      } catch (error) {
        toast.error("Alguma coisa deu errado!");
      }
    } else {
      toast.error("Nome e textos não podem ser nulos");
    }
  }

  return (
    <div data-color-mode="light" className={styles.createQuizBody}>
      <div className={styles.createQuizTitle}>
        <Input
          placeholder="Título"
          type="text"
          value={quizName}
          onChange={(i) => setlessonName(i.target.value)}
        />
      </div>

      <div className={styles.createQuizText}>
        <MDEditor value={quizText} onChange={setlessonText} height="20%" />
      </div>
      <div className={styles.space}></div>
      <Tip>Use a linguagem de markdown para escrever o corpo do quiz</Tip>

      <Tip>
        Você tem que escolher qual será a resposta correta, o botão ao lado das
        respostas
      </Tip>

      <div className={styles.createQuizAnswers}>
        {/* {quiz.map(i => <div>i</div>)} */}
        <div>
          <b>Respostas:</b>
        </div>

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
        quiz.answer.map((i) => (

                <button>{i.text}</button>
                <input type="text" value={quizAnswer1} onChange={(i) => setlessonName(i.target.value)}  />
                

            ))} */}

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
  );
};
