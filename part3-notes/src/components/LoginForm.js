const LoginForm = ({
  handleSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => (
  <form onSubmit={handleSubmit}>
    <h2>Login</h2>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        // destructure the event directly to get the target
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
);

export default LoginForm;
