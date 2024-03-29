import { useNavigate } from "react-router-dom";
import ProfileColoredImage from "../../../../assets/images/bug_alpha.png"
import styles from "./ChapterButton.module.css"
import { RouteList } from "../../../../routes/router";

interface ChapterButtonProps {
     idChapter: number,
     name: string,
}


export function ChapterButton (props: ChapterButtonProps) {

    const navigate = useNavigate()
    return (
        <div className={styles.lessonButton} onClick={() => navigate(RouteList.CHAPTER)}>
            
            <div className={styles.image}>
                <img src={ProfileColoredImage} alt="" />
            </div>
            <div className={styles.chapterTitle}>
                <b>{props.name}</b>
            </div>
        </div>
    );
}