import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Course, useLessons } from "../../api";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { Button } from "../../../../shared/components/Button/Button.component";
import { Card } from "../../../../shared/components/Card/Card.component";
import { CenterContent } from '../../components/CenterContent/CenterContent.component';
import styles from './SearchCoursesPage.module.css'
import { CourseItem } from "../../components/CourseItem";

export const SearchCoursesPage = () => {
    const navigate = useNavigate();
    const { getCourses, searchCourses } = useLessons();
    const [courses, setCourses] = useState<Course[]>()
    const {search} = useParams()

    async function fetchCourses() {
        try {
            const response = await searchCourses(search as string);
            setCourses(response.data)
        } catch {
            toast.error('Alguma coisa deu errad!')
        }

    }

    useEffect(() => {
        fetchCourses()
    }, [])

    function seeCourse(courseID: number){
        navigate('/courses/'+courseID)
    }

    return <>
    <AppLayout page="courses" variant="white">
            <div className={styles.contentWrapper}>
                <CenterContent> 
                    {
                        courses?.map(
                            (i) => ( 
                                <CourseItem course={i}/> )
                        ) }
                </CenterContent>
            </div>
        </AppLayout>
    </>
}