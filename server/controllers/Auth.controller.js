import AuthService from '../services/Auth.service';
import RedisService from '../services/Redis.service';

const redis = new RedisService();

export default class AuthController {
  static async login(req, res) {
    const { login, password } = req.body;
    const user = await AuthService.authenticate(login, password);
    req.session.user = user.id;
    const token = await AuthService.generateJWT(user);
    req.session.token = token;
    const refreshToken = await AuthService.generateRefreshToken(user.id);

    res.json({ token, refreshToken, userId: user.id });
  }

  static async refresh(req, res) {
    const { token, refreshToken } = await AuthService.refresh(req.body);
    res.status(200).json({ token, refreshToken });
  }

  static async logout(req, res) {
    if (!req.session?.user) return res.sendStatus(200);
    await redis.del(`${req.session.user}:jwtid`);
    req.session.destroy();

    return res.sendStatus(200);
  }
}
