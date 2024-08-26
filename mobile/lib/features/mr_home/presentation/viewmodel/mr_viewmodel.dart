import 'package:flutter/material.dart';
import 'package:mobile/config/routes/AppRoutes.dart';
import 'package:mobile/config/routes/navigate_services.dart';

class MedicalRepDashboardViewModel extends ChangeNotifier {
  String name = 'John Doe';
  String designation = 'Medical Representative';
  String profileImageUrl = 'https://via.placeholder.com/150';

  final NavigationService navigationService;

  MedicalRepDashboardViewModel({
    required this.navigationService,
  });

  void fetchData() {
    // Logic to fetch data
  }

  void navigateToChemistList() {}

  void navigateToDoctorList() {
    navigationService.navigateTo(AppRoutes.msldoctorlist);
  }
}
