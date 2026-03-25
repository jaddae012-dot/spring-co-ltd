
export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "prime-college-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
