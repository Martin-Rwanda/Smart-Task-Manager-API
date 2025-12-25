import { IUserRepository, UserRepositoryFactory } from "../../user/repositories";
import { PasswordService } from "./PasswordService";
import { JwtService } from "./JwtService";
import { AppError } from "../../../core/errors";


export class AuthService {
    private userRepo: IUserRepository;

    constructor(repo?: IUserRepository){
        this.userRepo = repo ?? UserRepositoryFactory.create();
    }

    async login(email: string, password: string){
        const user = await this.userRepo.findByEmail(email);

        if(!user) {
            throw new AppError('Invalid credentials');
        }

        const isValid = await PasswordService.compare(
            password,
            user.password
        )

        if(!isValid) {
            throw new AppError('Invalid credentials');
        }

        const token = JwtService.sign({
            userId: user.id,
            role:user.role
        })
        return { token };
    }
}