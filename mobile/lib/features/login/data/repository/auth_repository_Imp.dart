import 'dart:developer';
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:mobile/core/resources/data_state.dart';
import 'package:mobile/features/login/domain/entities/Token.dart';
import 'package:mobile/features/login/domain/repository/auth_repository.dart';
import 'package:mobile/service/auth_api_service.dart';

class AuthRepositoryImp implements AuthRepository {
  @override
  final AuthApiService _authApiService;
  AuthRepositoryImp(this._authApiService);

  @override
  Future<DataState<UserToken>> login(String email, String password) async {
    try {
      final httpResponse =
          await _authApiService.login({'email': email, 'password': password});

      if (httpResponse.response.statusCode == HttpStatus.ok) {
        log("This is passed");
        return DataSuccess(httpResponse.data);
      } else {
        return DataFailed(DioException(
            error: httpResponse.response.statusMessage,
            response: httpResponse.response,
            type: DioExceptionType.badResponse,
            requestOptions: httpResponse.response.requestOptions));
      }
    } on DioException catch (e) {
      return DataFailed(e);
    }
  }
}
