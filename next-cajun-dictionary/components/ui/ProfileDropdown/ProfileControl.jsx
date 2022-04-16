import classes from './profile-dropdown.module.css';
import {MdOutlineArrowDropDown} from 'react-icons/md';
import {BsPerson} from 'react-icons/bs';

export default function ProfileControl() {
  return(<div className={classes.icon_container}>
    <BsPerson className={classes.profile_icon} />
    <MdOutlineArrowDropDown className={classes.profile_icon} />
  </div>)
      
}
