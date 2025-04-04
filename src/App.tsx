import "./App.scss";
import { LoginForm } from "./components/LoginForm";

function App() {
  const handleLoginSuccess = () => {};

  return (
    <div>
      <h1>로그인</h1>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default App;
