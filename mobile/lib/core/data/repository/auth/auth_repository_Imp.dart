import 'dart:developer';
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:mobile/core/resources/data_state.dart';
import 'package:mobile/features/login/domain/entities/Token.dart';
import 'package:mobile/features/login/domain/entities/User.dart';
import 'package:mobile/core/domain/repository/auth/auth_repository.dart';
import 'package:mobile/service/auth_api_service.dart';

class AuthRepositoryImp implements AuthRepository {
  final AuthApiService _authApiService;
  AuthRepositoryImp(this._authApiService);

  @override
  Future<DataState<UserToken>> login(String email, String password) async {
    try {
      final httpResponse =
          await _authApiService.login({'email': email, 'password': password});

      if (httpResponse.response.statusCode == HttpStatus.ok) {
        return DataState.success(httpResponse.data);
      } else {
        return DataState.error(httpResponse.response.statusMessage.toString());
      }
    } on DioException catch (e) {
      return DataState.error(e.message.toString());
    }
  }

  @override
  Future<DataState<User>> verify(String token) async {
    try {
      final httpResponse = await _authApiService.verify(token);

      if (httpResponse.response.statusCode == HttpStatus.ok) {
        final user = httpResponse.data.user;
        return DataState.success(httpResponse.data.user);
      } else {
        return DataState.error(httpResponse.response.statusMessage);
      }
    } on DioException catch (e) {
      log("Error Occurrered ${e.message}");
      return DataState.error(e.message.toString());
    }
  }
}
