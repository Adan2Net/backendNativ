export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  date_of_birth?: Date;
  gender?: string;
}
