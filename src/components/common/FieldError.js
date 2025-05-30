const FieldError = ({ message }) => {
    if (!message) return null;
  
    return (
      <div className="ui red message" style={{ marginTop: '0.25em' }}>
        {message}
      </div>
    );
  };
  
  export default FieldError;
  