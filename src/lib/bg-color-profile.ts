export const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const getAvatarColor = (initials: string) => {
  const hue = initials.charCodeAt(0) * 137.508;
  return `hsl(${hue % 360}, 70%, 80%)`;
};
