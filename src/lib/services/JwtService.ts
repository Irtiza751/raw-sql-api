import jwt from 'jsonwebtoken';

type SignType = 'normal' | 'refresh';

export class JwtService {
  private static JWT_SECRET = process.env.JWT_SECRET || 'abcxyz';
  private static REFRESH_SECRET = process.env.REFRESH_SECRET || 'xyzabc';

  static sign(payload: any, type: SignType) {
    switch (type) {
      case 'refresh':
        return jwt.sign(payload, this.REFRESH_SECRET, { expiresIn: '1h' });
      default:
        return jwt.sign(payload, this.JWT_SECRET, { expiresIn: '30s' });
    }
  }

  static varify(token: string, type: SignType) {
    switch (type) {
      case 'refresh':
        return jwt.verify(token, this.REFRESH_SECRET);
      default:
        return jwt.verify(token, this.JWT_SECRET);
    }
  }

  static decode(token: string) {
    return jwt.decode(token);
  }
}
