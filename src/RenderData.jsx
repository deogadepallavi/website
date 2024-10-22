
const RenderData = (props) => {

  function navigateTo(url) {
    window.location.href = url;
    window.location.reload();
  }
    return (
      <div className="sightseeing-style">
        <p className="sightseeing-para-style">{props?.message?.message}</p>
        <button className="button-style" onClick={() => navigateTo("/api/session")}>Back</button>
      </div>
    );
  };
export default RenderData;  