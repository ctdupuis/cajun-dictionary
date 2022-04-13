import { capitalize } from "../../../helpers/formatting";
import styles from '../Button/button.module.css';

export default function Button({ text, handleClick }) {
  return (
    <button className={styles.btn} onClick={handleClick ? handleClick : () => console.log('button pressed')}>{capitalize(text)}</button>
  )
}
