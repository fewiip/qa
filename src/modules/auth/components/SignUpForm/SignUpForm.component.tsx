import { SignUpProps } from "../../api"
import styles from "./SignUpForm.module.css"
import { FunctionComponent, useState } from "react"

interface SignUpFormProps {
  onSubmit: (payload: SignUpProps) => void
}

export const SignUpForm: FunctionComponent<SignUpFormProps> = (props) => {

  const { onSubmit } = props  

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit() {
    onSubmit({email, password, firstName, lastName})  
  }

  return <div className={styles.loginCard}>
      <input type="text" value={firstName} onChange={(i) => setFirstName(i.target.value)} /> <br />
      <input type="text" value={lastName} onChange={(i) => setLastName(i.target.value)} /> <br />
      <input type="text" value={email} onChange={(i) => setEmail(i.target.value)} /> <br />
      <input type="password" value={password} onChange={(i) => setPassword(i.target.value)} />  <br />

      <button onClick={handleSubmit}>Criar conta</button>
  </div>
}