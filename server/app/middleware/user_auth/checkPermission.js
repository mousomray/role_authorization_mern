const getPermissionsForRole = require('./getPermission')

// Middleware for RBAC
const checkPermission = (requiredPermissions) => {
    return (req, res, next) => {
        try {
            const userRole = req.user.role;
            const userPermissions = getPermissionsForRole(userRole);

            // Check if user has all required permissions
            const hasPermission = requiredPermissions.every(permission =>
                userPermissions.includes(permission) 
            );

            if (!hasPermission) {
                return res.status(403).json({ message: "You do not have the necessary permissions to perform this action." });
            }
            next();
        } catch (error) {
            console.error("Error in permission check:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
};
module.exports = checkPermission; 
