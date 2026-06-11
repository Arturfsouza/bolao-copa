export const ADMINS = [
  "artur.fonseca.souza@gmail.com",
];

export function isAdmin(email?: string | null) {
  return !!email && ADMINS.includes(email);
}