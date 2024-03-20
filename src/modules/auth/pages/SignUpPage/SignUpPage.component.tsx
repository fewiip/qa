import { useNavigate } from "react-router-dom";
import { SignUpProps, useAuth } from "../../api";
import { SignUpForm } from "../../components/SignUpForm";
import { useAuthStore } from "../../stores/useAuthStore.hook";
import styles from "./SignUpPage.module.css";
import { RouteEnum } from "../../../../routes/router";

export const SignUpPage = () => {

  const { signUp } = useAuth()
  const { setToken } = useAuthStore()
  const { setUserData } = useAuthStore()
  const navigate = useNavigate()


  async function handleSubmit(payload: SignUpProps) {
    try {
      const response = await signUp(payload)

      setToken(response.data.token)
      setUserData(response.data.user)

      navigate(RouteEnum.LESSONS)
    } catch (error) {
      alert('dados incorretos')
    }
  }

  return <div className={styles.loginWrapper}>
    <div className={styles.loginCard}>
      Criar conta
      
      <br />

      <SignUpForm onSubmit={handleSubmit} />
    </div>
  </div>
}