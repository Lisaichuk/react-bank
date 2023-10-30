export const SESSION_KEY = "sessionAuth";

interface Session {
  token: string;
}

export const saveSession = (session: Session) => {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const loadSession = (): Session | null => {
  try {
    const sessionJSON = localStorage.getItem(SESSION_KEY);
    if (sessionJSON) {
      const session = JSON.parse(sessionJSON) as Session;
      return session;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const endSession = (): Session | null => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.log(error);
  } finally {
    return null;
  }
};

// export const getTokenSession = (): string | null => {
//   const session = loadSession();
//   return session ? session.token : null;
// };

// export const getSession = (): Session | null => {
//   return loadSession();
// };
