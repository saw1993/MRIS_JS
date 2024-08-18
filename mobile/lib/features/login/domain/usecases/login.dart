import 'package:mobile/core/resources/data_state.dart';
import 'package:mobile/features/login/domain/entities/Token.dart';
import 'package:mobile/features/login/domain/repository/auth_repository.dart';

class LoginUseCase {
  final AuthRepository _authRepository;

  LoginUseCase(this._authRepository);

  Future<DataState<UserToken>> login(String email, String password) async {
    return await _authRepository.login(email, password);
  }
}
