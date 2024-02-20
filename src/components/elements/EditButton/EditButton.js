import './EditButton.css';
import editIcon from '../../../images/editIcon.svg';

const EditButton = ({ onClick }) => {
  return (
    <button className="edit-icon" >
      <img className="edit-icon-image" src={editIcon} alt="иконка редактирования" onClick={onClick} />
    </button>
  );
}

export default EditButton;