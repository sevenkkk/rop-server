import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: '00092839291',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
