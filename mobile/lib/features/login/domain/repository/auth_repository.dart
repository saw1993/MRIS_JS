import 'package:mobile/features/login/domain/entities/Token.dart';
import 'package:mobile/core/resources/data_state.dart';

abstract class AuthRepository {
  Future<DataState<UserToken>> login(String email, String password);
}
