import 'package:mobile/core/domain/repository/token/token_repositroy.dart';

class DeleteTokenUseCase {
  final TokenRepository repository;

  DeleteTokenUseCase(this.repository);

  Future<void> execute() async {
    await repository.deleteToken();
  }
}
