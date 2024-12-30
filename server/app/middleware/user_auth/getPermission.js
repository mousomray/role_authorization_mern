// Function to get permissions for a role
const getPermissionsForRole = (role) => {
    const rolePermissions = {
        admin: ["create_blog", "edit_blog", "delete_blog", "view_blog"],
        manager: ["create_blog", "edit_blog", "view_blog"],
        employee: ["create_blog", "view_blog"],
    };
    return rolePermissions[role];
};
module.exports = getPermissionsForRole; 