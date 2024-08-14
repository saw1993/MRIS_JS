import 'package:flutter/material.dart';
import 'package:mobile/core/resources/data_state.dart';
import 'package:mobile/features/login/domain/entities/Token.dart';
import 'package:mobile/features/login/domain/usecases/login.dart';

class LoginViewModel extends ChangeNotifier {
  final LoginUseCase loginUseCase;

  LoginViewModel({required this.loginUseCase});

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  DataState<UserToken>? _user;

  String? _errorMessage;
  String? get errorMessage => _errorMessage;

  Future<void> login(String email, String password) async {
    _isLoading = true;
    notifyListeners();

    try {
      _user = await loginUseCase.execute(email, password);
      _errorMessage = null;
    } catch (e) {
      _errorMessage = 'Login failed';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
