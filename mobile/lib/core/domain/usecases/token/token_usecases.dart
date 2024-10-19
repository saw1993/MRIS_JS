import 'package:mobile/core/domain/usecases/token/token_delete.dart';
import 'package:mobile/core/domain/usecases/token/token_read.dart';
import 'package:mobile/core/domain/usecases/token/token_save.dart';

class TokenUseCases {
  final SaveTokenUseCase saveToken;
  final GetTokenUseCase getToken;
  final DeleteTokenUseCase deleteToken;

  TokenUseCases({
    required this.saveToken,
    required this.getToken,
    required this.deleteToken,
  });
}
