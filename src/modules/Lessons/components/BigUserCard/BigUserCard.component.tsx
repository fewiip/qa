import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import styles from './BigUserCard.module.css'
import avatar_colored from "../../../../assets/images/avatar_colored.png"
import { useNavigate } from 'react-router-dom';
import { Button } from "../../../../shared/components/Button/Button.component";

export const BigUserCard = () => {
    const { user, logout } = useAuthStore()
    const navigate = useNavigate()

    function editUser() {
        navigate('edit/')
    }

    function deleteUser() {
        navigate('')
    }

    function onExit(){
        logout()
        navigate('/login')
    }

    return <>
        <div className={styles.userCard}>
            <div className={styles.imgAndInfo}>
            <div className={styles.userAvatar}>
                <img src={avatar_colored} alt="" />
            </div>

            <div className={styles.userInfo}>
                <div className={styles.userName}>{user?.firstName} {user?.lastName} </div>
                <div className={styles.userRole}>QA Master</div>
                <div className={styles.buttons}>
                    <Button onClick={editUser}  >Atualizar dados</Button>
                    <Button onClick={deleteUser}>Excluir conta</Button>
                </div>
            </div>
            </div>
            
            <div>
                <Button onClick={onExit}>Sair</Button>
            </div>
        </div>
    </>
}