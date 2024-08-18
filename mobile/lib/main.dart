import 'dart:io';

import 'package:flutter/material.dart';
import 'package:mobile/config/routes/AppRoutes.dart';
import 'package:mobile/config/theme/app_themes.dart';
import 'package:mobile/features/home/admin_home.dart';
import 'package:mobile/features/login/presentation/login_screen.dart';
import 'package:mobile/features/user_home/presentation/pages/user_home.dart';
import 'package:mobile/injection/injection_container.dart';
import 'features/splash_screen/splash_screen.dart';

Future<void> main() async {
  await initializeDependancies();
  HttpOverrides.global = MyHttpOverrides();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: theme(),
      home: SplashScreen(),
      routes: {
        AppRoutes.login: (context) => LoginScreen(),
        AppRoutes.home: (context) => UserHomeScreen(),
        AppRoutes.admin: (context) => AdminHomeScreen(),
      },
    );
  }
}

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..badCertificateCallback =
          (X509Certificate cert, String host, int port) => true;
  }
}
