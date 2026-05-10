import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  // Tambahkan JwtService ke dalam constructor
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email sudah terdaftar, silakan gunakan email lain.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

    const newUser = await this.prisma.user.create({
      data: {
        nama: dto.nama,
        email: dto.email,
        password: hashedPassword,
        no_telepon: dto.no_telepon,
        role: dto.role,
      },
      select: {
        id: true,
        nama: true,
        email: true,
        role: true,
        created_at: true,
      },
    });

    return newUser;
  }

  // --- FITUR LOGIN BARU KITA ---
  async login(dto: LoginDto) {
    // 1. Cari user berdasarkan email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // 2. Jika user tidak ditemukan, tolak
    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    // 3. Cek apakah password yang diketik cocok dengan yang ada di database
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    // 4. Jika sukses, buat tiket JWT (Payload)
    const payload = { sub: user.id, email: user.email, role: user.role };
    
    // 5. Kembalikan token ke pengguna
    return {
      message: 'Login berhasil',
      access_token: await this.jwtService.signAsync(payload),
      role: user.role, // Kita kembalikan role agar frontend tahu harus mengarahkan ke halaman mana
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { toko: true },
    });
    
    if (!user) {
      throw new UnauthorizedException('User tidak ditemukan');
    }
    
    // Hilangkan password sebelum dikembalikan
    const { password, ...result } = user;
    return result;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    // 1. Update data dasar User
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(dto.nama && { nama: dto.nama }),
        ...(dto.no_telepon && { no_telepon: dto.no_telepon }),
      },
    });

    // 2. Jika user adalah PENYEDIA dan ingin update data toko
    if (updatedUser.role === 'PENYEDIA' && (dto.alamat_toko || dto.latitude !== undefined || dto.longitude !== undefined)) {
      // Karena kita tidak yakin toko sudah dibuat atau belum, kita pakai findFirst dulu
      const toko = await this.prisma.toko.findUnique({ where: { penyedia_id: userId } });
      
      if (toko) {
        await this.prisma.toko.update({
          where: { id: toko.id },
          data: {
            ...(dto.alamat_toko !== undefined && { alamat_toko: dto.alamat_toko }),
            ...(dto.latitude !== undefined && { latitude: dto.latitude }),
            ...(dto.longitude !== undefined && { longitude: dto.longitude }),
          },
        });
      }
      // Jika toko belum ada, abaikan (mereka harus membuat toko via halaman dashboard)
    }

    return await this.getProfile(userId);
  }
}