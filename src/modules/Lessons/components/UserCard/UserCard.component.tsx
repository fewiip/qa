import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import styles from './UserCard.module.css'

export const UserCard = () => {
    const { user } = useAuthStore();

    return <>
        <div>
            <div className={styles.userName}>{user?.firstName} {user?.lastName} </div>
            <div className={styles.userRole}>QA Master</div>
        </div>
    </>
}