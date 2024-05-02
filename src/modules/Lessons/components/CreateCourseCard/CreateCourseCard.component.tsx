import { FunctionComponent, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import styles from './CreateCourseCard.module.css'
import { CenterContent } from "../CenterContent/CenterContent.component";
import { Input } from "../../../../shared/components/Input";
import { Button } from "../../../../shared/components/Button/Button.component";
import { Course, CoursePOST, useLessons } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { ActionsHelperCard } from "../ActionsHelperCard/ActionsHelperCard.component";
import Image from "../../../../assets/images/image_greyscale.png"

interface CreateCourseCardProps {
    userid: number,
}

export const CreateCourseCard: FunctionComponent<CreateCourseCardProps> = (props) => {
    const { userid } = props
    const navigate = useNavigate()
    const { createCourse } = useLessons()
    const [courseName, setcourseName] = useState('');

    const course: CoursePOST = {
        name: '',
        owner: userid
    }

    function handleCancel() {
        navigate('/')
    }

    async function handleSubmit() {
        try {
            course.name = courseName;
            console.log(course)
            const response = await createCourse(course)
            console.log(response.data.id)
            navigate(`/courses/${response.data.id}`)
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