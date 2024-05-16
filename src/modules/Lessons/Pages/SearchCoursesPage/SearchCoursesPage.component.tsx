import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Course, useLessons } from "../../api";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { CenterContent } from '../../components/CenterContent/CenterContent.component';
import { CourseItem } from "../../components/CourseItem";
import { Input } from "../../../../shared/components/Input";
/*import { Button } from "../../../../shared/components/Button/Button.component";
import { Card } from "../../../../shared/components/Card/Card.component";*/
import team2_colored from "../../../../assets/images/team2_colored.png";

import styles from './SearchCoursesPage.module.css'
import searchIcon from "../../../../assets/images/search2.png"

export const SearchCoursesPage = () => {
    const navigate = useNavigate();
    const { searchCourses } = useLessons();
    const [courses, setCourses] = useState<Course[]>()
    const {search} = useParams()
    const [searchText, setSearchtext] = useState(search as string)

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

    /*function seeCourse(courseID: number){
        navigate('/courses/'+courseID)
    }*/

    function handleSearch () {
        if(searchText.length){
            navigate('/courses/search/'+search)
        }
    }

    return <>
    <AppLayout page="courses" variant="white">
            <div className={styles.contentWrapper}>
                <CenterContent> 
                <div className={styles.content}>
              <div className={styles.text}>
                <center>
                  <h1>BUSCA:</h1>
                  <img src={team2_colored} className={styles.textimg} alt="" />
                  <Input icon={searchIcon} onIconClick={handleSearch} value={searchText} onChange={(i) => setSearchtext(i.target.value)}></Input>
                </center>
                <div  className={styles.space}></div>
                <b>Resultados para '{search}'':</b> 
              </div>
              <div className={styles.cards}>  
              
                    {
                        courses?.map(
                            (i) => ( 
                                <CourseItem course={i}/> )
                        ) }
              </div>
            </div>
                
                </CenterContent>
            </div>
        </AppLayout>
    </>
}