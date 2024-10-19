import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:mobile/config/routes/AppRoutes.dart';
import 'package:mobile/config/routes/navigate_services.dart';
import 'package:mobile/core/domain/repository/token/token_repositroy.dart';
import 'package:mobile/core/resources/data_state.dart';
import 'package:mobile/features/login/domain/entities/Token.dart';
import 'package:mobile/core/domain/usecases/auth/login.dart';

class LoginViewModel extends ChangeNotifier {
  final LoginUseCase loginUseCase;
  final NavigationService navigationService;
  final TokenRepository tokenRepository;

  LoginViewModel(
      {required this.loginUseCase,
      required this.navigationService,
      required this.tokenRepository});

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
        var token = _user?.data?.token;
        if (stateofCall == 'Success') {
          // login passed
          _errorMessage = 'Login Successful';
          await tokenRepository.saveToken(token!);
          verify();
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

  Future<void> verify() async {
    _isLoading = true;
    notifyListeners();

    final token = await tokenRepository.getToken();
    if (token == null) {
      _isLoading = false;
    } else {
      try {
        _isLoading = true;
        var userData = await loginUseCase.verify(token.toString());
        if (userData.data != null) {
          final roleID = userData.data?.roleId;
          log("role id is $roleID");
          switch (roleID) {
            case 1:
              {
                //user
                break;
              }
            case 2:
              {
                //Admin
                navigationService.navigateTo(AppRoutes.admin);
                break;
              }
            case 3:
              {
                //Medical Rep
                navigationService.navigateTo(AppRoutes.mr_home);
                break;
              }
            default:
          }
        } else {
          _errorMessage = 'User Data not found';
        }
      } catch (e) {
        _errorMessage = 'Token verification failed: $e';
        await tokenRepository.deleteToken();
      } finally {
        _isLoading = false;
        notifyListeners();
      }
    }
  }
}
