import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from '@node-rs/bcrypt';
import { UsersService } from '../../users/users.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return this.generateToken(user.id, user.username);
  }
  
  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return this.generateToken(user.id, user.username);
  }

  private generateToken(userId: number, username: string) {
    const payload = { sub: userId, username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}