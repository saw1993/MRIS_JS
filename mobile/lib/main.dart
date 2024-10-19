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

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: theme(),
      navigatorKey:
          sl<NavigationService>().navigatorKey, // Use DI for NavigationService
      home: const SplashScreen(),
      onGenerateRoute: (RouteSettings settings) {
        switch (settings.name) {
          case AppRoutes.login:
            return MaterialPageRoute(builder: (context) => const LoginScreen());
          case AppRoutes.mr_home:
            return MaterialPageRoute(builder: (context) => const MRHomeScreen());
          case AppRoutes.admin:
            return MaterialPageRoute(builder: (context) => const AdminHomeScreen());
          case AppRoutes.msldoctorlist:
            return MaterialPageRoute(builder: (context) => const DoctorList());
          default:
            return MaterialPageRoute(builder: (context) => const SplashScreen());
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
