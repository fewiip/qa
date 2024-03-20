import { Button } from "../../../../shared/components/Button/Button.component"
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

  //<Button onClick={handleSubmit}>Criar conta</Button>

  return <div className={styles.loginCard}>
      
      <label htmlFor="firstName">Nome</label>
      <input placeholder='' type="text" value={firstName} onChange={(i) => setFirstName(i.target.value)} /> 
      
      <label htmlFor="firstName">Sobrenome</label>
      <input placeholder='' type="text" value={lastName} onChange={(i) => setLastName(i.target.value)} /> 
      
      <label htmlFor="firstName">E-mail</label>
      <input placeholder='' type="text" value={email} onChange={(i) => setEmail(i.target.value)} /> 
      
      <label htmlFor="firstName">Senha</label>
      <input placeholder='' type="password" value={password} onChange={(i) => setPassword(i.target.value)} />  

      <button onClick={handleSubmit}>Criar conta</button>
  </div>
}