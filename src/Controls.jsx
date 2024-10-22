
function Controls({ onLogout }) {

    return (
      <div className="controls">
        <button onClick={onLogout} className="button-style">Logout</button>
      </div>
    );
  }
  
  export default Controls;