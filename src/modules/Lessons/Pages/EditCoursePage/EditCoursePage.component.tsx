import { toast } from 'react-toastify';
import { AppLayout } from '../../../../shared/components/AppLayout';
import { useNavigate, useParams } from "react-router-dom"
import { CenterContent } from "../../components/CenterContent"
import Image from "../../../../assets/images/image.png"
import styles from './EditCoursePage.module.css'
import { Button } from "../../../../shared/components/Button/Button.component"
import { Input } from "../../../../shared/components/Input"
import { ChapterPOST, Course, useLessons } from '../../api';
import { useState, useEffect } from "react";
import { EditCourseCard } from '../../components/EditCourseCard/EditCourseCard.component';
import { ActionsHelperCard } from '../../components/ActionsHelperCard';

export const EditCoursePage = () => {
    const { courseid } = useParams();
    const { getCourse, createChapter, editCourse } = useLessons()
    const [course, setCourse] = useState<Course>();
    const [courseName, setCourseName] = useState(course?.name);
    const navigate = useNavigate()

    console.log('course id ' + courseid)
    console.log(course)

    async function fetchCourse() {
        const response = await getCourse(parseInt(courseid as string));
        console.log('pegou', response.data)
        setCourseName(response.data.name)
        setCourse(response.data)
    }

    useEffect(() => {
        if(courseid) {
            fetchCourse()
        }
    }, [courseid])

    async function handleEditApply () {
        try{
            const payload = {
                name: courseName,
                id: course?.id
            }
            console.log('simulando envio', payload)
            const response = await editCourse(parseInt(courseid as string))
            navigate(`/course/edit/${courseid}`)

        } catch(err) {
            console.error("erro: " + err )
        }
    }

    return <AppLayout variant='white' page='courses'>
        <div className={styles.contentWrapper}>

            <CenterContent>
                <div className={styles.content}>
                    <div className={styles.img}>
                        <img src={Image} alt="" />
                    </div>
                    <div className={styles.text}>
                        <div>
                            Turma: <Input value={courseName} onChange={(i) => setCourseName(i.target.value)} />
                        </div>
                    </div>

                </div>
                
                <ActionsHelperCard/>
                <EditCourseCard courseid={parseInt(courseid as string)}/>
                <div>
                    <Button onClick={handleEditApply}>
                        Salvar
                    </Button>
                    <Button>
                        Cancelar
                    </Button>
                </div>
            </CenterContent>
        </div>
    </AppLayout>
}