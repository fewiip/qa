import { FunctionComponent, useState } from "react"; 
import styles from './CreateCourseCard.module.css'
import { CenterContent } from "../CenterContent/CenterContent.component";
import { Input } from "../../../../shared/components/Input";
import { Button } from "../../../../shared/components/Button/Button.component";
import { CoursePOST, UserCourseStatistics, useLessons } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; 
import Image from "../../../../assets/images/bookRed_colored.png"


interface CreateCourseCardProps {
    userid: number,
}

export const CreateCourseCard: FunctionComponent<CreateCourseCardProps> = (props) => {
    const { userid } = props
    const navigate = useNavigate()
    const { createCourse,setUserStatistics,subscribeToCourse  } = useLessons()
    const [courseName, setcourseName] = useState('');
    const [courseDescription, setcourseDescription] = useState('');

    

    function handleCancel() {
        navigate('/')
    }

    async function subscribe(courseID: number, userID: number) {
        try {
            
            const payload = {
              courseId: courseID,
            };
            const payload2:UserCourseStatistics = {
              refill: 5,
              coin: 5,
              victory: 0,
              bug: 0
            }
            
            await subscribeToCourse(payload, userID); 
            await setUserStatistics(userID, payload2);
            
        } catch (error) {
          toast.error("Alguma coisa deu errado!");
          console.log(error);
        }
      }

    async function handleSubmit() {
        try {
            const payload: CoursePOST = {
                name: courseName,
                owner: userid,
                description: courseDescription
            } 
            console.log(payload)
            const response = await createCourse(payload)
            console.log(response.data.id)
            subscribe(response.data.id, userid)
            navigate(`/course/edit/${response.data.id}`)
            
        } catch (error) {
            toast.error('Alguma coisa deu errado!')
        }
    }


    return <>
        <CenterContent>
            <div className={styles.content}>
                <div className={styles.img}>
                    <img src={Image} alt="" />
                </div>
                <div className={styles.text}>
                    <div>
                        <p>Turma:</p>
                        <Input placeholder="Nome da Turma"  value={courseName} onChange={(i) => setcourseName(i.target.value)}/>
                        <p>Descrição:</p>
                        {/*<TextArea placeholder="Descrição da Turma" />*/}
                        <textarea name="" id="" placeholder="Descrição da Turma" value={courseDescription} onChange={(i) => setcourseDescription(i.target.value)} ></textarea>
                    </div>
                </div>

            </div> 
            <div>
                <Button onClick={handleSubmit}>
                    Salvar
                </Button>
                <Button onClick={handleCancel}>
                    Cancelar
                </Button>
            </div>
        </CenterContent>
    </>
}