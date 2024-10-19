import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mobile/core/domain/repository/token/token_repositroy.dart';

class TokenRepositoryImpl implements TokenRepository {
  final FlutterSecureStorage secureStorage;

  TokenRepositoryImpl({required this.secureStorage});

  @override
  Future<void> saveToken(String token) async {
    await secureStorage.write(key: 'auth_token', value: token);
  }

  @override
  Future<String?> getToken() async {
    final token = await secureStorage.read(key: 'auth_token');
    final finalToken = "Bearer ${token!}";
    return finalToken;
  }

  @override
  Future<void> deleteToken() async {
    await secureStorage.delete(key: 'auth_token');
  }
}
