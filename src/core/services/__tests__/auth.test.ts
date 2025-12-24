import { AuthService, PasswordService, JwtService } from "../../../modules/auth/services";
import { MockUserRepository } from "../../__mocks__";

jest.mock("../../../modules/auth/services/PasswordService");
jest.mock("../../../modules/auth/services/JwtService")

describe("AuthService", () => {
    let authService: AuthService;
    let repo: MockUserRepository;

    beforeEach(() => {
        repo = new MockUserRepository();
        authService = new AuthService(repo);
    });

    it("should throw if user not found", async () => {
        repo.findByEmail.mockResolvedValue(null);

        await expect(authService.login("test@gmail.com", "123456"))
            .rejects.toThrow("Invalid credentials");
    });

    it("should throw if password invalid", async () => {
        repo.findByEmail.mockResolvedValue({ password: "hash", id: "1", role: "USER" });
        (PasswordService.compare as jest.Mock).mockReturnValue(false);

        await expect(authService.login("test@gmail.com", "wrong"))
            .rejects.toThrow("Invalid credentials");
    });

    it("should return token if credentials valid", async () => {
        repo.findByEmail.mockResolvedValue({ password: "hash", id: "1", role: "USER" });
        (PasswordService.compare as jest.Mock).mockReturnValue(true);
        (JwtService.sign as jest.Mock).mockReturnValue("jwt-token");

        const result = await authService.login("test@gmail.com", "123456");

        expect(result.token).toBe("jwt-token");
    });
});
