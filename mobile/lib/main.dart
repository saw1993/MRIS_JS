import 'dart:io';
import 'package:flutter/material.dart';
import 'package:mobile/config/routes/AppRoutes.dart';
import 'package:mobile/config/theme/app_themes.dart';
import 'package:mobile/features/doctorlist/presentation/pages/home/doctor_list.dart';
import 'package:mobile/features/home/admin_home.dart';
import 'package:mobile/features/login/presentation/login_screen.dart';
import 'package:mobile/features/mr_home/presentation/pages/mr_home.dart';
import 'package:mobile/injection/injection_container.dart';
import 'features/splash_screen/splash_screen.dart';
import 'package:mobile/config/routes/navigate_services.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initializeDependencies();
  HttpOverrides.global = MyHttpOverrides();

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: theme(),
      navigatorKey:
          sl<NavigationService>().navigatorKey, // Use DI for NavigationService
      home: SplashScreen(),
      onGenerateRoute: (RouteSettings settings) {
        switch (settings.name) {
          case AppRoutes.login:
            return MaterialPageRoute(builder: (context) => LoginScreen());
          case AppRoutes.mr_home:
            return MaterialPageRoute(builder: (context) => MRHomeScreen());
          case AppRoutes.admin:
            return MaterialPageRoute(builder: (context) => AdminHomeScreen());
          case AppRoutes.msldoctorlist:
            return MaterialPageRoute(builder: (context) => DoctorList());
          default:
            return MaterialPageRoute(builder: (context) => SplashScreen());
        }
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
