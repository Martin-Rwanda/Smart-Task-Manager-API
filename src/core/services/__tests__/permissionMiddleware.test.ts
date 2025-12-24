import { requirePermission } from "../../../modules/auth/middlewares";
import { Permission } from "../../../modules/auth/types";

describe("Permission Middleware", () => {
    it("should allow access if permission exists", () => {
        const req: any = {
            user: { role: "ADMIN"},
        }
        const next = jest.fn();

        const middleware = requirePermission(Permission.TASK_DELETE);
        middleware(req, {} as any, next);

        expect(next).toHaveBeenCalled();
    })

    it("should block access if permission missing", () => {
        const req: any = {
            user: { role: "USER"}
        }

        const next = jest.fn();

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        const middleware = requirePermission(Permission.TASK_DELETE)
        middleware(req, res, next)

        expect(next).toHaveBeenCalled()
        expect(next.mock.calls[0][0].statusCode).toBe(403);
    })
})