
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    //CHECK IF USER exit and has a role
    if (!req.user || !req.user.roles) {
      return res.status(403).json({ message: 'Access denied. No roles found.' });
    }
    if (!allowedRoles.some(role => req.user.roles.includes(role))) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};

