export const registerUser = (username, email, password) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const normalizedEmail = email.trim().toLowerCase();

  if (users.find((u) => u.email.toLowerCase() === normalizedEmail)) {
    throw new Error("User already exists with this email");
  }

  const newUser = {
    username: username.trim(),
    email: normalizedEmail,
    password: password.trim(),
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return newUser;
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  const user = users.find(
    (u) => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword,
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return user;
};
