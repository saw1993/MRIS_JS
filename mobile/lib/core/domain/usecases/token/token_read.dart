import 'package:mobile/core/domain/repository/token/token_repositroy.dart';

class GetTokenUseCase {
  final TokenRepository repository;

  GetTokenUseCase(this.repository);

  Future<String?> execute() async {
    return await repository.getToken();
  }
}
