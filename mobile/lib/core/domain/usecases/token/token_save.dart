import 'package:mobile/core/domain/repository/token/token_repositroy.dart';

class SaveTokenUseCase {
  final TokenRepository repository;

  SaveTokenUseCase(this.repository);

  Future<void> execute(String token) async {
    await repository.saveToken(token);
  }
}
