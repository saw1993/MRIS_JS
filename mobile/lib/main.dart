import 'package:flutter/material.dart';
import 'package:mobile/features/home/admin_home.dart';
import 'package:mobile/features/login/presentation/login_screen.dart';
import 'features/splash_screen/splash_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SplashScreen(),
      routes: {
        '/home': (context) => LoginScreen(), // Define your home screen
      },
    );
  }
}