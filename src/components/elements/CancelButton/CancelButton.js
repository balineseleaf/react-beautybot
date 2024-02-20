import './CancelButton.css';

const CancelButton = ({ onClick }) => {
  return (
    <button type="button" className="cancel-button" onClick={onClick}>Отмена</button>
  );
}

export default CancelButton;