export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    //CHECK IF USER HAS ROLES
    if (!req.user || !req.user.roles) {
      return res.status(403).json({ message: 'Access denied. No roles found.' });
    }
    if (!allowedRoles.some(role => req.user.roles.includes(role))) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};