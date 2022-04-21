import { useState } from 'react';
import classes from './new-term.module.css';
import Button from '../../ui/Button/Button';

export default function NewTermForm() {
  const [name, setName] = useState("");
  const [pronounce, setPronounce] = useState("");
  const [definition, setDefinition] = useState("");
  const [useCase, setUseCase] = useState("");

  const submitTerm = () => {
    console.log({ name, pronounce, definition, useCase })
  }

  return (
    <form className={classes.form} onSubmit={e => e.preventDefault()}>
      <label htmlFor='name'>Your Term</label>
      <input 
      className={classes.input} 
      type='text' 
      placeholder='The name of your term here'
      value={name} 
      onChange={e => setName(e.target.value)} />

      <label htmlFor='pronounce'>Pronunciation</label>
      <input 
      className={classes.input} 
      type='text' 
      placeholder='Try to guide others on how to pronounce your term'
      value={pronounce} 
      onChange={e => setPronounce(e.target.value)} />

      <label htmlFor='definition'>Definition</label>
      <textarea 
      className={classes.input} 
      type='text'
      placeholder='What does your term mean?' 
      value={definition} 
      onChange={e => setDefinition(e.target.value)} />

      <label htmlFor='name'>Use Case Example</label>
      <textarea 
      placeholder='Type an example of how to use this term in a sentence. Please wrap your sentence in double quotes ("")' 
      className={classes.input}
      value={useCase}
      onChange={e => setUseCase(e.target.value)}></textarea>
      
      <Button text={'submit'} handleClick={submitTerm} />
    </form>
  )
}
