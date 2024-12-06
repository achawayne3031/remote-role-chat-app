import Form from "react-bootstrap/Form";
import "./../styles/form.scss";

const InputField = ({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  errorText,
  disabled,
  onChange,
}) => {
  return (
    <div className="input-wrapper">
      {/* <label htmlFor={label} className="input-label">
        {label}
      </label> */}

      <Form.Control
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #DFE4EA",
          padding: "15px",
        }}
        name={name}
        type={type}
        id={label}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {Boolean(error && errorText) && (
        <>
          <p className="error"> {errorText}</p>
        </>
      )}
    </div>
  );
};

export default InputField;
