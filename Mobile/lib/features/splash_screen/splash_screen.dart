import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:mobile/config/routes/AppRoutes.dart';

class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    // Simulate some initialization tasks, e.g., loading data
    SchedulerBinding.instance.addPostFrameCallback((_) {
      Future.delayed(Duration(seconds: 2), () {
        Navigator.of(context).pushReplacementNamed(AppRoutes.login);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Text('Loading Zyntec MRIS'),
      ),
    );
  }
}
