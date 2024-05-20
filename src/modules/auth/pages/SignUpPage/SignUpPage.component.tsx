import { useNavigate } from "react-router-dom";
import { SignUpProps, useAuth } from "../../api";
import { SignUpForm } from "../../components/SignUpForm";
import { useAuthStore } from "../../stores/useAuthStore.hook";
import styles from "./SignUpPage.module.css";
import { RouteList } from "../../../../routes/router";
import background from "../../../../assets/images/background.png"

import qa_logo from "../../../../assets/images/qatransparent.png";
import { toast } from "react-toastify";

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

      navigate(RouteList.LESSONS)
    } catch (error) {
      //alert('dados incorretos')
      toast.error('Dados incorretos')
    }
  }

  return <div className={styles.loginWrapper}>
    
    <div className={styles.imageSide} style={{backgroundImage: `url(${background})`}}>
    <div className={styles.parent}>
            <div className={styles.description}>
              <center>
                <b>
                  A forma divertida de aprender e ensinar sobre testes e
                  qualidade de software!
                </b>
              </center>
            </div>

            <div className={styles.imageconteiner}>
              <img src={qa_logo} alt="" />
            </div>
          </div>
    </div>
    
    <div className={styles.formSide}>
      <h1 className={styles.heading}>Criar sua conta</h1> 
      <div className={styles.imgform}>
            <img src={qa_logo} alt="" />
          </div>
      
      
      <br />

      <SignUpForm onSubmit={handleSubmit} />
    </div>
  </div>
}