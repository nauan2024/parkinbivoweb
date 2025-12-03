import "./style.css";

export const InputText = ({ label, placeholder, type = "text", ...rest }) => {
  return (
    <div className="input-wrapper">
      {label && <label>{label}</label>}
      <input 
        type={type} 
        placeholder={placeholder} 
        className="custom-input"
        {...rest} 
      />
    </div>
  );
};