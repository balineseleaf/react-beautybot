import './SaveButton.css';

const SaveButton = ({ onClick, disabled }) => {
  return (
    <button type="submit" className="save-button" onClick={onClick} disabled={disabled}>Сохранить</button>
  )
}

export default SaveButton;