import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:mobile/config/routes/AppRoutes.dart';
import 'package:mobile/config/routes/navigate_services.dart';
import 'package:mobile/core/resources/data_state.dart';
import 'package:mobile/features/login/domain/entities/Token.dart';
import 'package:mobile/features/login/domain/usecases/login.dart';

class LoginViewModel extends ChangeNotifier {
  final LoginUseCase loginUseCase;
  final NavigationService navigationService;

  LoginViewModel({
    required this.loginUseCase,
    required this.navigationService,
  });

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  DataState<UserToken>? _user;
  String? _errorMessage;
  String? get errorMessage => _errorMessage;

  Future<void> login(String email, String password) async {
    _isLoading = true;
    notifyListeners();

    try {
      _user = await loginUseCase.login(email, password);
      if (_user != null) {
        var stateofCall = _user?.data?.status;
        if (stateofCall == 'Success') {
          // login passed
          _errorMessage = 'Login Successful';
        } else {
          _errorMessage = 'Login failed: Incorrect credientials';
        }
      } else {
        _errorMessage = 'Login failed : Unknown Error';
      }
    } catch (e) {
      log(e.toString());
      _errorMessage = 'Login failed: $e';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
