export const registerUser = (username, email, password) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find((u) => u.email === email))
    throw new Error("User already exists");

  const newUser = { username, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return newUser;
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const cleanEmail = email.trim();
  const cleanPassword = password.trim();

  const user = users.find(
    (u) => u.email === cleanEmail && u.password === cleanPassword,
  );

  if (!user) throw new Error("Invalid email or password");
  return user;
};
