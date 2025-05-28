export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  role: string; // Added role field to allow specifying user roles during creation
}