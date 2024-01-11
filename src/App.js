import "./App.css";
import { usePrivy } from "@privy-io/react-auth";

function App() {
  const {
    ready,
    authenticated,
    user,
    login,
    logout,
    linkEmail,
    unlinkEmail,
    linkGoogle,
    unlinkGoogle,
  } = usePrivy();

  // Wait until the Privy client is ready before taking any actions
  if (!ready) {
    return null;
  }

  const unlinkEmailEvent = () => {
    unlinkEmail(user.email?.address)
      .then(() => alert("Unink Email Success"))
      .catch(() => alert("Unlink Email Failed"));
  };

  const unlinkGoogleEvent = () => {
    unlinkGoogle(user.google?.subject)
      .then(() => alert("Unink OAuth Success"))
      .catch(() => alert("Unlink OAuth Failed"));
  };
  return (
    <div className="App">
      <header className="App-header">
        {/* If the user is not authenticated, show a login button */}
        {/* If the user is authenticated, show the user object and a logout button */}
        {ready && authenticated ? (
          <div>
            <textarea
              readOnly
              value={JSON.stringify(user, null, 2)}
              style={{ width: "600px", height: "250px", borderRadius: "6px" }}
            />
            <br />
            <button
              onClick={logout}
              style={{
                marginTop: "20px",
                padding: "12px",
                backgroundColor: "#069478",
                color: "#FFF",
                border: "none",
                borderRadius: "6px",
              }}
            >
              Log Out
            </button>
          </div>
        ) : (
          <button
            onClick={login}
            style={{
              padding: "12px",
              backgroundColor: "#069478",
              color: "#FFF",
              border: "none",
              borderRadius: "6px",
            }}
          >
            Log In
          </button>
        )}
        <div 
          style={buttonStyle}
        >
          <button onClick={linkEmail}>Link Email</button>
          <button onClick={unlinkEmailEvent}>UnLink Email</button>
        </div>
        <div 
          style={buttonStyle}
        >
          <button onClick={linkGoogle}>Link Google</button>
          <button onClick={unlinkGoogleEvent}>Unlink Google</button>
        </div>
      </header>
    </div>
  );
}

export default App;

const buttonStyle = {
  display: "flex",
  gap: "10px"
}
