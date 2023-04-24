import { User } from '../../db/entity/User';
import { LoginDto } from '../../dto/auth/login';
import bcrypt from 'bcrypt';
import { signJWT } from './jwt';

export const login = async (loginDto: LoginDto) => {
    const { email, password } = loginDto;
    
    const user = await User.findOneBy({ email });
    if (!user) throw new Error('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    return {
        ...user,
        token: signJWT(user),
    };
};
