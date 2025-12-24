import { Role } from "./role";
import { Permission } from "./permission";

export const RolePermission: Record<Role, Permission[]> = {
    [Role.ADMIN]: [
        Permission.TASK_CREATE,
        Permission.TASK_UPDATE,
        Permission.TASK_DELETE,
        Permission.TASK_VIEW,
        Permission.USER_CREATE,
        Permission.USER_DELETE,
        Permission.USER_UPDATE,
        Permission.USER_VIEW,
        Permission.USER_UPDATE_ROLE
    ],

    [Role.MANAGER]: [
        Permission.TASK_CREATE,
        Permission.TASK_UPDATE,
        Permission.TASK_VIEW,
        Permission.USER_UPDATE,
        Permission.TASK_VIEW
    ],

    [Role.USER]: [
        Permission.TASK_VIEW,
        Permission.USER_VIEW
    ]
};