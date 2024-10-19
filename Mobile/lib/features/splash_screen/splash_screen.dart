import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:mobile/config/routes/AppRoutes.dart';
import 'package:mobile/config/routes/navigate_services.dart';
import 'package:mobile/injection/injection_container.dart'; // Import your DI

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  late NavigationService _navigationService;

  @override
  void initState() {
    super.initState();
    _navigationService = sl<NavigationService>(); // Retrieve from DI container

    // Simulate some initialization tasks, e.g., loading data
    SchedulerBinding.instance.addPostFrameCallback((_) {
      Future.delayed(const Duration(seconds: 2), () {
        _navigationService.navigateTo(AppRoutes.login);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Text('Loading Zyntec MRIS'),
      ),
    );
  }
}
