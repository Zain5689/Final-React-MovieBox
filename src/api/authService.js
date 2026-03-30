export const registerUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const userExists = users.find((u) => u.email === email);

  if (userExists) throw new Error("User already exists");

  const newUser = { email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return newUser;
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) throw new Error("Invalid email or password");
  return user;
};
