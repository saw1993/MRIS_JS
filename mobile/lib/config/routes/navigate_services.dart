import 'package:flutter/material.dart';

class NavigationService {
  final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

  Future<void> navigateTo(String routeName, {Object? arguments}) {
    final navigator = navigatorKey.currentState;
    if (navigator == null) {
      print('Navigator state is null');
      return Future.error('Navigator state is null');
    }
    return navigator.pushNamed(routeName, arguments: arguments);
  }

  void goBack() {
    return navigatorKey.currentState!.pop();
  }
}
