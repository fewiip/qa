import { AppLayout } from "../../../../shared/components/AppLayout";
import { CenterContent } from '../../components/CenterContent/CenterContent.component';
import styles from './SeeAllCoursesPage.module.css'
import { Course, useLessons } from "../../api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CourseItem } from "../../components/CourseItem";
/*import { useNavigate } from "react-router-dom";
import { Card } from "../../../../shared/components/Card/Card.component";
import { Button } from "../../../../shared/components/Button/Button.component";*/

export const SeeAllCourses = () => {
    const { getCourses } = useLessons();
    const [courses, setCourses] = useState<Course[]>()
    //const navigate = useNavigate()

    
    async function fetchCourses() {
        try {
            const response = await getCourses();
            setCourses(response.data)
        } catch {
            toast.error('Alguma coisa deu errad!')
        }
        
    }
    
    useEffect(() => {
        fetchCourses()
    }, [])
    /*
    function handleClick() {
        navigate('')
    }
    function seeCourse(courseID: number){
        navigate('/courses/'+courseID)
    } */
    return <>
        <AppLayout page="courses" variant="white">
            <div className={styles.contentWrapper}>
                <CenterContent> 
                    {
                        courses?.map(
                            (i) => ( 
                                <CourseItem course={i}/>
                             )
                        )
                    }
                </CenterContent>
            </div>
        </AppLayout>
    </>
}