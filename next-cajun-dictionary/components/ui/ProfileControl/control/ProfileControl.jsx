import classes from './profile-ctrl.module.css';
import {MdOutlineArrowDropDown} from 'react-icons/md';
import {BsPerson} from 'react-icons/bs';
import ProfileDropdown from '../dropdown/ProfileDropdown';
import { useState } from 'react';

export default function ProfileControl() {
  const [open, setOpen] = useState(false);

  return(<div className={classes.icon_container} onClick={() => setOpen(!open)}>
    <BsPerson className={classes.profile_icon} />
    <MdOutlineArrowDropDown className={classes.profile_icon} />
    { open ? 
    <ProfileDropdown />
    :
    null
    }
  </div>)
      
}
