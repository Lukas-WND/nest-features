import * as bcrypt from 'bcrypt';

export async function passwordToHash(password: string): Promise<string> {
  const salt_rounds = 10;
  return await bcrypt.hash(password, salt_rounds);
}
