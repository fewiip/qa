import { useNavigate } from "react-router-dom";
import ProfileColoredImage from "../../../../assets/images/bug_alpha.png"
import styles from "./LessonButton.module.css"
import { RouteList } from "../../../../routes/router";

interface LessonButtonProps {
     lessonid: number,
     name: string,
}


export function LessonButton (props: LessonButtonProps) {

    const navigate = useNavigate()
    return (
        <div className={styles.lessonButton} onClick={() => navigate(RouteList.LESSON + '/' + props.lessonid)}>
            
            <div className={styles.image}>
                <img src={ProfileColoredImage} alt="" />
            </div>
            <div className={styles.lessonTitle}>
                <b>{props.name}</b>
            </div>
        </div>
    );
}